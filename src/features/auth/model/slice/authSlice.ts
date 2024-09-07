import { createSlice } from '@reduxjs/toolkit'
import { setAppInitialized, setAppStatus } from '@/app/model/appReducer'
import { authAPI } from '../../api'
import { createAppAsyncThunk } from '@/shared/utils'
import { handleServerAppError, handleServerNetworkError } from '@/shared/utils/error-utils'
import { LoginParams } from '../type'
import { ResultCode } from '@/shared/constants'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('authToken'), // Инициализация состояния на основе наличия токена
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      localStorage.removeItem('authToken') // Очистка токена при выходе
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action?.payload?.isLoggedIn
    })
  },
} as ReturnType<typeof slice>)

// thunk:
const login = createAppAsyncThunk<{ isLoggedIn: boolean; token: string }, LoginParams>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await authAPI.login(arg)
      // Проверяем успешность логина по `error_code === 0`
      if (res.data.error_code === ResultCode.Success) {
        const token = res.data.data.token // Извлекаем токен из ответа

        // Сохраняем токен в localStorage
        if (token) {
          localStorage.setItem('authToken', token)
          dispatch(setAppStatus({ status: 'succeeded' }))
          return { isLoggedIn: true, token }
        }
      } else {
        if (res.data.error_code === ResultCode.BadRequest) {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(res.data)
        }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppInitialized({ isInitialized: true }))
    }
  }
)

export const authReducer = slice.reducer
export const { logout } = slice.actions
export const authThunks = { login }
