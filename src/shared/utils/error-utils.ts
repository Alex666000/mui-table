import { setAppError, setAppStatus } from '@/app/model/appReducer'
import { AppDispatch, AppRootState } from '@/app/providers/store/store'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { BadRequest } from '@/features/auth/model/type'
import { ResultCode } from '../constants'
import axios from 'axios'
import { CreateRecordResError, CreateError } from '@/entities/api'

/**
 * Обрабатывает ошибки, полученные от сервера, и обновляет статус приложения.
 * @param {BadRequest} data - Объект ошибки, полученный от сервера, содержащий код ошибки и текст ошибки.
 * @param {AppDispatch} dispatch - Диспетчер Redux для изменения состояния приложения.
 * @param {boolean} [isShowGlobalError=true] - Флаг, указывающий, нужно ли отображать глобальную ошибку (по умолчанию true).
 */
export const handleServerAppError = (
  data: BadRequest,
  dispatch: AppDispatch,
  isShowGlobalError: boolean = true
) => {
  if (isShowGlobalError) {
    debugger
    dispatch(
      setAppError({
        error: data.error_code !== ResultCode.Success ? data.error_text : 'Some error occurred',
      })
    )
  }
  debugger
  dispatch(setAppStatus({ status: 'failed' }))
}

/**
 * Обрабатывает сетевые ошибки, возникающие при запросах на сервер, и обновляет статус приложения.
 * @param {object} error - Объект ошибки, содержащий сообщение об ошибке.
 * @param {ThunkDispatch<AppRootState, unknown, UnknownAction>} dispatch - Диспетчер Redux для изменения состояния приложения.
 */
export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ThunkDispatch<AppRootState, unknown, UnknownAction>
) => {
  let errorMessage = 'Connection error'

  if (axios.isAxiosError(error)) {
    debugger
    errorMessage = `${error.response?.data?.errors.documentName[0]} And ${error.response?.data?.errors.documentStatus[0]}`
    // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву "undefined"
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
    // ❗ Какой-то другой непонятный кейс
  } else {
    // переводим объект в строку
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: 'failed' }))
}
