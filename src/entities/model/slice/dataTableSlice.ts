import { createSlice, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from '@/shared/utils'
import { setAppStatus, setAppSuccess } from '@/app/model/appSlice'
import { dataTableAPI } from '../../api'
import { AppRootState } from '@/app/providers/store/store'
import { ResultCode } from '@/shared/constants'
import { Table, TableState } from '../types'

// slice
const slice = createSlice({
  name: 'table',
  initialState: {
    data: [] as Table[],
    isDataLoaded: false, // Флаг: загружены данные?
  } satisfies TableState,
  reducers: {} as ValidateSliceCaseReducers<TableState, any>,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.fulfilled, (state: TableState, action) => {
        if (action.payload) {
          state.data = action.payload.tableData
          state.isDataLoaded = true
        }
      })
      .addCase(createRecord.fulfilled, (state: TableState, action) => {
        state.data.push(action.payload)
      })
      .addCase(updateRecord.fulfilled, (state: TableState, action) => {
        const index = state.data.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(deleteRecord.fulfilled, (state: TableState, action) => {
        state.data = state.data.filter((record) => record.id !== action.payload.id)
      })
  },
})

// thunks:
const fetchTableData = createAppAsyncThunk<{ tableData: Table[] }, void>(
  `${slice.name}/fetchTable`,
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    const state = getState() as AppRootState

    if (!state?.tableData?.isDataLoaded) {
      return thunkTryCatch(thunkAPI, async () => {
        const res = await dataTableAPI.fetchTableData()
        if (res.data.error_code === ResultCode.Success) {
          return { tableData: res.data.data }
        } else {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        }
      })
    }
  }
)

const createRecord = createAppAsyncThunk<Table, Table>(
  `${slice.name}/createRecord`,
  async (newRecord, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await dataTableAPI.createRecord(newRecord)
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppSuccess({ message: 'Record successfully added!' }))
        return res.data.data
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

const updateRecord = createAppAsyncThunk<Table, { id: string; data: Table }>(
  `${slice.name}/updateRecord`,
  async ({ id, data }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await dataTableAPI.updateRecord(id, data)
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppSuccess({ message: 'Record successfully updated!' }))
        return res.data.data
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

const deleteRecord = createAppAsyncThunk<Table, string>(
  `${slice.name}/deleteRecord`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await dataTableAPI.deleteRecord(id)
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(setAppSuccess({ message: 'Record successfully deleted!' }))
        return { id } // Возвращаем только id удаленной записи
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

// reducer + actions + thunks
export const dataTableReducer = slice.reducer
export const {} = slice.actions
export const tablesThunks = { fetchTableData, createRecord, updateRecord, deleteRecord }
