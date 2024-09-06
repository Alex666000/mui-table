import { combineReducers, configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { appReducer } from '@/app/model/appReducer'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '@/features/auth/model/slice/authSlice'
import { dataTableReducer } from '@/entities/model/dataTableSlice'

const rootReducer = combineReducers({
  app: appReducer,
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
