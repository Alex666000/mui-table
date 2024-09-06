import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerNetworkError } from '@/shared/utils'
import { setAppStatus } from '@/app/model/appReducer'
import { dataTableAPI, TableData } from '@/entities/api/dataTableApi'
import { AxiosError } from 'axios'
import { AppRootState } from '@/app/providers/store/store'
import { ResultCode } from '@/shared/constants'

const slice = createSlice({
  name: 'table',
  initialState: {
    data: [] as TableData[],
    isDataLoaded: false, // Флаг: загружены данные с сервера?
  },
  reducers: {} as any,
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.fulfilled, (state: TableState, action) => {
      if (action.payload) {
        state.data = action.payload.tableData
        state.isDataLoaded = true
      }
    })
    builder.addCase(createRecord.fulfilled, (state: TableState, action) => {
      state.data.push(action.payload)
    })
  },
})

// thunks
// 1 - параметр, то что санка возвращает + то что нам надо установить в стейт
// 2 - параметр, то что санка принимает в параметрах
const fetchTableData = createAppAsyncThunk<{ tableData: TableData[] }, void>(
  `${slice.name}/fetchTable`,
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI

    const state = getState() as AppRootState

    try {
      if (!state?.tableData?.isDataLoaded) {
        dispatch(setAppStatus({ status: 'loading' }))
        const res = await dataTableAPI.fetchTableData()
        if (res.data.error_code === ResultCode.Success) {
          dispatch(setAppStatus({ status: 'succeeded' }))
          return { tableData: res.data.data }
        } else {
          if (res.data.error_code === ResultCode.BadRequest) {
            dispatch(setAppStatus({ status: 'failed' }))
            return rejectWithValue(null)
          }
        }
      }
    } catch (error: AxiosError) {
      if (error) {
        dispatch(setAppStatus({ status: 'failed' }))
        if (state?.tableData?.isDataLoaded) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      }
    }
  }
)

const createRecord = createAppAsyncThunk<TableData, TableData>(
  `${slice.name}/createRecord`,
  async (newRecord, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await dataTableAPI.createRecord(newRecord)
      if (res.status === 200) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return res.data
      } else {
        dispatch(setAppStatus({ status: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (error: AxiosError) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const dataTableReducer = slice.reducer
export const {} = slice.actions
export const tablesThunks = { fetchTableData, createRecord }

// types
type TableState = {
  data: TableData[]
  isDataLoaded: boolean
}
