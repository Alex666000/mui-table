import { createSlice } from '@reduxjs/toolkit'
import { authAPI } from '../../api'
import { createAppAsyncThunk } from '@/shared/utils'
import { LoginParams } from '../type'
import { ResultCode } from '@/shared/constants'
import { AxiosError } from 'axios/index'
import { setAppError, setAppInitialized, setAppStatus } from '@/app/model'
import axios from 'axios'

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
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const res = await authAPI.login(arg)
      // Проверяем успешность логина по `error_code === 0`
      if (res.data.error_code === ResultCode.Success) {
        const token = res.data.data.token // Извлекаем токен из ответа

        // Сохраняем токен в localStorage
        if (token) {
          dispatch(setAppStatus({ status: 'succeeded' }))
          return { isLoggedIn: true, token }
        }
      } else {
        if (res.data.error_code === ResultCode.BadRequest) {
          const errorMessage = res.data.error_code
          dispatch(
            setAppError({
              error:
                errorMessage !== ResultCode.Success ? res.data.error_text : 'Some error occurred',
            })
          )
          dispatch(setAppStatus({ status: 'failed' }))

          return rejectWithValue(null)
        }
      }
    } catch (error: AxiosError) {
      if (error) {
        let errorMessage = 'Connection error'

        if (axios.isAxiosError(error)) {
          // ⏺️ err?.message - например при логинизации в "offline" режиме
          errorMessage = error.response?.data?.message || error?.message || errorMessage
          // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву "undefined"
        } else if (error instanceof Error) {
          errorMessage = `Native error: ${error.message}`
          // ❗ Какой-то другой непонятный кейс
        } else {
          // переводим объект в строку
          errorMessage = JSON.stringify(error)
        }

        dispatch(setAppError({ error: error.message ? error.message : errorMessage }))
        dispatch(setAppStatus({ status: 'failed' }))
        return rejectWithValue(null)
      }
    } finally {
      dispatch(setAppInitialized({ isInitialized: true }))
    }
  }
)

export const authReducer = slice.reducer
export const { logout } = slice.actions
export const authThunks = { login }
