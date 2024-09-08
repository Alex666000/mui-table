import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from '@/app/providers/store/store'
import { BadRequestResData } from '@/entities/model/types'

/**
 * Утилита для создания типизированного асинхронного действия (thunk) с заранее заданными типами для состояния, диспетчера и значения при отклонении.
 * @template ReturnedType - Тип данных, возвращаемых при успешном выполнении асинхронного действия.
 * @template ThunkArg - Тип аргумента, передаваемого в thunk-действие.
 * @template RejectedValue - Тип значения при отклонении, обычно это `null`, `BadRequest` или неизвестная ошибка.
 * @returns {createAsyncThunk} Типизированный экземпляр функции `createAsyncThunk` для безопасного создания асинхронных действий.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: AppDispatch
  rejectValue: null | BadRequestResData | unknown
}>()
