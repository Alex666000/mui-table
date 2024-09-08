import { combineReducers, configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { appSlice } from '../../model'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '@/features/auth/model/slice/authSlice'
import { dataTableReducer } from '@/entities/model/slice/dataTableSlice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authReducer,
  tableData: dataTableReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()

// @ts-ignore
window.store = store
