import { setAppError, setAppStatus } from '@/app/model/appReducer'
import { AppDispatch, AppRootState } from '@/app/providers/store/store'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { BadRequest } from '@/features/auth/model/type'
import { ResultCode } from '../constants'

export const handleServerAppError = (
  data: BadRequest,
  dispatch: AppDispatch,
  isShowGlobalError: boolean = true
) => {
  if (isShowGlobalError) {
    dispatch(
      setAppError({
        error: data.error_code !== ResultCode.Success ? data.error_text : 'Some error occurred',
      })
    )
  }

  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ThunkDispatch<AppRootState, unknown, UnknownAction>
) => {
  let errorMessage = 'Connection error'

  if (axios.isAxiosError(error)) {
    // ⏺️ err?.message - например при логинизации в "offline" режиме
    errorMessage = error.response?.data?.message || error?.message || errorMessage
    // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву undefined
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
    // ❗ Какой-то другой непонятный кейс
  } else {
    // переводим объект в строку
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppError({ error: error.message ? error.message : errorMessage }))
  dispatch(setAppStatus({ status: 'failed' }))
}
