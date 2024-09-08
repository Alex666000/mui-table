import { ResultCode } from '@/shared/constants'
import { setAppError, setAppStatus } from '@/app/model'
import axios from 'axios'
import { CreateRecordResError, CreateRecordResErrors } from '@/entities/api'
import { BadRequestResData } from '@/entities/model/types'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { AppRootState } from '@/app/providers/store/store'
import { AxiosError } from 'axios/index'

// handleServerAppError
export const handleServerAppError = (data: BadRequestResData, dispatch: ReduxDispatch) => {
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

// handleServerNetworkError
export const handleServerNetworkError = (
  error: CatchError,
  dispatch: ThunkDispatch<AppRootState, unknown, UnknownAction>
) => {
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
      errorMessage = 'No internet connection'
    }
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = `Unknown error: ${JSON.stringify(error)}`
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: 'failed' }))
}

// type
type CatchError = AxiosError | Error
type ReduxDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>
