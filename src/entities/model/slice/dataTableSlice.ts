import { createSlice, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/shared/utils'
import { setAppError, setAppStatus } from '@/app/model/appSlice'
import { CreateRecordResError, CreateRecordResErrors, dataTableAPI } from '../../api'
import axios, { AxiosError } from 'axios'
import { AppRootState } from '@/app/providers/store/store'
import { ResultCode } from '@/shared/constants'
import { TableData, TableState } from '../types'
import { handleServerAppError } from '@/shared/utils/error-utils'

// slice
const slice = createSlice({
  name: 'table',
  initialState: {
    data: [] as TableData[],
    isDataLoaded: false, // Флаг: загружены данные с сервера?
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

// thunks
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
          handleServerAppError()
          // if (res.data.error_code === ResultCode.BadRequest) {
          //   const errorMessage = res.data.error_code
          //   dispatch(
          //     setAppError({
          //       error:
          //         errorMessage !== ResultCode.Success ? res.data.error_text : 'Some error occurred',
          //     })
          //   )
          //   dispatch(setAppStatus({ status: 'failed' }))
          //   return rejectWithValue(null)
          // }
        }
      }
    } catch (error: Error | AxiosError) {
      dispatch(setAppStatus({ status: 'failed' }))
      if (state?.tableData?.isDataLoaded) {
        let errorMessage = 'Connection error'

        if (axios.isAxiosError(error)) {
          // ⏺️ err?.message - например при логинизации в "offline" режиме
          errorMessage = error.response?.data?.message || error?.message || errorMessage
          // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву "undefined"
        } else if (error instanceof Error) {
          errorMessage = `Native error: ${error.message}`
          // ❗ Какой-то другой непонятный кейс
        } else {
          // переводим объект в строку
          errorMessage = JSON.stringify(error)
        }

        dispatch(setAppError({ error: error.message ? error.message : errorMessage }))
        dispatch(setAppStatus({ status: 'failed' }))
        return rejectWithValue(null)
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
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return res.data.data
      } else {
        if (res.data.error_code === ResultCode.BadRequest) {
          const errorMessage = res.data.error_code
          dispatch(
            setAppError({
              error:
                errorMessage !== ResultCode.Success ? res.data.error_text : 'Some error occurred',
            })
          )
          dispatch(setAppStatus({ status: 'failed' }))
          return rejectWithValue(null)
        }
      }
    } catch (error: AxiosError | Error) {
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
  }
)

const updateRecord = createAppAsyncThunk<TableData, { id: string; data: TableData }>(
  `${slice.name}/updateRecord`,
  async ({ id, data }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await dataTableAPI.updateRecord(id, data)
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return res.data.data
      } else {
        if (res.data.error_code === ResultCode.BadRequest) {
          const errorMessage = res.data.error_code
          dispatch(
            setAppError({
              error:
                errorMessage !== ResultCode.Success ? res.data.error_text : 'Some error occurred',
            })
          )
          dispatch(setAppStatus({ status: 'failed' }))
          return rejectWithValue(null)
        }
      }
    } catch (error: AxiosError | Error) {
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
  }
)

const deleteRecord = createAppAsyncThunk<TableData, string>(
  `${slice.name}/deleteRecord`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await dataTableAPI.deleteRecord(id)
      if (res.data.error_code === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return { id } // Возвращаем только id удаленной записи
      } else {
        if (res.data.error_code === ResultCode.BadRequest) {
          const errorMessage = res.data.error_code
          dispatch(
            setAppError({
              error:
                errorMessage !== ResultCode.Success ? res.data.error_text : 'Some error occurred',
            })
          )
          dispatch(setAppStatus({ status: 'failed' }))
          return rejectWithValue(null)
        }
      }
    } catch (error: AxiosError | Error) {
      let errorMessage = 'Connection error'

      if (axios.isAxiosError(error)) {
        // ⏺️ err?.message - например при логинизации в "offline" режиме
        errorMessage = error.response?.data?.message || error?.message || errorMessage
        // ❗ Проверка на наличие нативной ошибки - например "мапимся" по массиву "undefined"
      } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
        // ❗ Какой-то другой непонятный кейс
      } else {
        // переводим объект в строку
        errorMessage = JSON.stringify(error)
      }

      dispatch(setAppError({ error: error.message ? error.message : errorMessage }))
      dispatch(setAppStatus({ status: 'failed' }))
      return rejectWithValue(null)
    }
  }
)

// reducer + actions + thunks
export const dataTableReducer = slice.reducer
export const {} = slice.actions
export const tablesThunks = { fetchTableData, createRecord, updateRecord, deleteRecord }
