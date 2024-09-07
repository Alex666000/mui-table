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
export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch) => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    const axiosError = error as axios.AxiosError

    // Проверка наличия ошибок в ответе сервера
    if (axiosError.response?.data) {
      const responseData = axiosError.response.data as CreateRecordResError<CreateError> | unknown
      if (responseData.errors) {
        const documentNameError = responseData.errors.documentName?.[0]
        const documentStatusError = responseData.errors.documentStatus?.[0]

        // Формируем сообщение об ошибке
        if (documentNameError && documentStatusError) {
          errorMessage = `${documentNameError} And ${documentStatusError}`
        } else if (documentNameError) {
          errorMessage = documentNameError
        } else if (documentStatusError) {
          errorMessage = documentStatusError
        }
      } else {
        errorMessage = responseData.error_text || 'Server error'
      }
    } else {
      errorMessage = 'Server error'
    }
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = `Unknown error: ${JSON.stringify(error)}`
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: 'failed' }))
}
