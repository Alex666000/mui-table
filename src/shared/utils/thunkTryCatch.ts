import { setAppStatus } from '@/app/model'
import { CatchError, handleServerNetworkError, ReduxDispatch } from '@/shared/utils/error-utils'
import { AxiosError } from 'axios'
import { createAppAsyncThunk } from '@/shared/utils/createAppAsyncThunk'

type ThunkAPI = {
  dispatch: ReduxDispatch
  rejectWithValue: createAppAsyncThunk['rejectValue']
}

export const thunkTryCatch = async <T>(
  { dispatch, rejectWithValue }: ThunkAPI,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    // logic:
    return await logic()
  } catch (error: AxiosError | Error | CatchError) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatus({ status: 'idle' }))
  }
}
