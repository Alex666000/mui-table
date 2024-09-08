import { setAppInitialized, setAppStatus } from '@/app/model'
import { handleServerNetworkError, ReduxDispatch } from '@/shared/utils/error-utils'
import { AxiosError } from 'axios'
import { createAppAsyncThunk } from '@/shared/utils/createAppAsyncThunk'

type ThunkAPI = {
  dispatch: ReduxDispatch
  rejectWithValue: createAppAsyncThunk['rejectValue']
}

export const thunkTryCatch = async (
  { dispatch, rejectWithValue }: ThunkAPI,
  logic: () => Promise<any>
) => {
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
