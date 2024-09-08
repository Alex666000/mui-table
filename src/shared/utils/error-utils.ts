import { ResultCode } from '@/shared/constants'
import { setAppError, setAppStatus } from '@/app/model'
import axios from 'axios'
import { CreateRecordResError, CreateRecordResErrors } from '@/entities/api'
import { BadRequestResData, ResponseData } from '@/entities/model/types'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { AppRootState } from '@/app/providers/store/store'

export const handleServerAppError = (
  data: BadRequestResData,
  dispatch: ThunkDispatch<AppRootState, unknown, UnknownAction>
) => {
  if (data.error_code === ResultCode.BadRequest) {
    const errorMessage = data.error_code
    dispatch(
      setAppError({
        error: errorMessage !== ResultCode.Success ? data.error_text : 'Some error occurred',
      })
    )
    dispatch(setAppStatus({ status: 'failed' }))
  }
}

export const handleServerNetworkError = () => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    const axiosError = error

    // Проверка наличия ошибок в ответе сервера
    if (axiosError.response?.data) {
      const responseData = axiosError.response.data as
        | CreateRecordResErrors<CreateRecordResError>
        | unknown
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
  return rejectWithValue(null)
}

// /**
//  * Обрабатывает ошибки, полученные от сервера, и обновляет статус приложения.
//  * @param {BadRequest} data - Объект ошибки, полученный от сервера, содержащий код ошибки и текст ошибки.
//  * @param {AppDispatch} dispatch - Диспетчер Redux для изменения состояния приложения.
//  * @param {boolean} [isShowGlobalError=true] - Флаг, указывающий, нужно ли отображать глобальную ошибку (по умолчанию true).
//  */
// export const handleServerAppError = (
//   data: BadRequest,
//   dispatch: AppDispatch,
//   isShowGlobalError: boolean = true
// ) => {
//   if (isShowGlobalError) {
//     dispatch(
//       setAppError({
//         error: data.error_code !== ResultCode.Success ? data.error_text : 'Some error occurred',
//       })
//     )
//   }
//
//   dispatch(setAppStatus({ status: 'failed' }))
// }
//
// /**
//  * Обрабатывает сетевые ошибки, возникающие при запросах на сервер, и обновляет статус приложения.
//  * @param {object} error - Объект ошибки, содержащий сообщение об ошибке.
//  * @param {ThunkDispatch<AppRootState, unknown, UnknownAction>} dispatch - Диспетчер Redux для изменения состояния приложения.
//  */
// export const handleServerNetworkError = (
//   error: { message: string },
//   dispatch: ThunkDispatch<AppRootState, unknown, UnknownAction>
// ) => {
//   let errorMessage = 'Connection error'
//
//   if (axios.isAxiosError(error)) {
//     // ⏺️ err?.message - например при логинизации в "offline" режиме
//     errorMessage = error.response?.data?.message || error?.message || errorMessage
//     // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву "undefined"
//   } else if (error instanceof Error) {
//     errorMessage = `Native error: ${error.message}`
//     // ❗ Какой-то другой непонятный кейс
//   } else {
//     // переводим объект в строку
//     errorMessage = JSON.stringify(error)
//   }
//
//   dispatch(setAppError({ error: error.message ? error.message : errorMessage }))
//   dispatch(setAppStatus({ status: 'failed' }))
// }
