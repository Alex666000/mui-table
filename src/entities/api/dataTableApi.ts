import { instance } from '@/shared/api'
import { CreateResponseRecord, FetchTableResponse, Record, TableData } from '../model/types'

const token = localStorage.getItem('authToken')

export const dataTableAPI = {
  fetchTableData() {
    return instance.get<FetchTableResponse<TableData>>(
      '/ru/data/v3/testmethods/docs/userdocs/get',
      {
        headers: { 'x-auth': token },
      } as ReturnType<typeof instance.get>
    )
  },
  createRecord(data: Record) {
    return instance.post<CreateResponseRecord<Record>>(
      '/ru/data/v3/testmethods/docs/userdocs/create',
      data,
      {
        headers: { 'x-auth': token },
      } as ReturnType<typeof instance.post>
    )
  },
  updateRecord(id: string, data: Record) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, data, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
  deleteRecord(id: string) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, null, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
}
