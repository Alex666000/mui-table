import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from '@/app/providers/store/store'
import { BadRequest } from '@/features/auth/model/type'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: null | BadRequest | unknown
}>()
