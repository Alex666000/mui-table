import { setAppInitialized, setAppStatus } from '@/app/model'
import { handleServerNetworkError } from '@/shared/utils/error-utils'
import { AxiosError } from 'axios'
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'

type ThunkAPI = {
  dispatch: ThunkDispatch<any, any, UnknownAction>
  rejectWithValue: any
}

export const thunkTryCatch = async (thunkAPI: ThunkAPI, logic: () => Promise<any>) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(setAppStatus({ status: 'loading' }))
    // logic
    return await logic()
  } catch (error: AxiosError | Error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatus({ status: 'idle' }))
    dispatch(setAppInitialized({ isInitialized: true }))
  }
}
