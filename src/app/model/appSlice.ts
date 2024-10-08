import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '@/shared/types/nullable'

const initialState = {
  // происходитли сейчас взаимодействие с сервером
  status: '' as RequestStatus,
  // если ошибка глобальная - запишем текст ошибки сюда
  error: null as Nullable<string>,
  // флаг инициализации приложения
  isInitialized: false,
  // состояние для успешного "глобального" уведомления
  successMessage: null as Nullable<string>,
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed' | ''

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.successMessage = action.payload.message
      state.error = null
    },
  },
})

export const appSlice = slice.reducer
export const { setAppStatus, setAppInitialized, setAppError, setAppSuccess } = slice.actions
