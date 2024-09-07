import { instance } from '@/shared/api'
import {
  CreateResponseRecord,
  FetchTableResponse,
  GetRequestMethod,
  PostRequestMethod,
  Record,
  TableData,
} from '../model/types'

const token = localStorage.getItem('authToken')

export const dataTableAPI = {
  fetchTableData() {
    return instance.get<FetchTableResponse<TableData>>(
      '/ru/data/v3/testmethods/docs/userdocs/get',
      {
        headers: { 'x-auth': token },
      } as GetRequestMethod
    )
  },
  createRecord(data: Record) {
    return instance.post<CreateResponseRecord<Record>>(
      '/ru/data/v3/testmethods/docs/userdocs/create',
      data,
      {
        headers: { 'x-auth': token },
      } as PostRequestMethod
    )
  },
  updateRecord(id: string, data: Record) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, data, {
      headers: { 'x-auth': token },
    } as PostRequestMethod)
  },
  deleteRecord(id: string) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, null, {
      headers: { 'x-auth': token },
    } as PostRequestMethod)
  },
}

// types
export type CreateRecordResError<D> = {
  errors: D
  type: string
  title: string
  status: number
  traceId: string
}
export type CreateError = {
  documentName: string[]
  documentStatus: string[]
}
