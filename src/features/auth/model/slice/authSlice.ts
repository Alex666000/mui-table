import { createSlice } from '@reduxjs/toolkit'
import { authAPI, LoginParams } from '../../api'
import { createAppAsyncThunk, handleServerAppError } from '@/shared/utils'
import { ResultCode } from '@/shared/constants'
import { thunkTryCatch } from '@/shared/utils/thunkTryCatch'

// slice:
const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('authToken'), // Инициализация состояния на основе наличия токена
    needsReload: false,
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
      state.token = action?.payload?.token
      localStorage.setItem('authToken', action?.payload?.token)
      state.needsReload = true
    })
  },
} as ReturnType<typeof slice>)

// thunk:
const login = createAppAsyncThunk<{ isLoggedIn: boolean; token: string }, LoginParams>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg)
      // Проверяем успешность логина по `error_code === 0`
      if (res.data.error_code === ResultCode.Success) {
        const token = res.data.data.token // Извлекаем токен из ответа
        // Сохраняем токен в localStorage
        if (token) {
          return { isLoggedIn: true, token }
        }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

// reducer + actions + thunks
export const authReducer = slice.reducer
export const { logout } = slice.actions
export const authThunks = { login }
