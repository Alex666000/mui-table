import { instance } from '@/shared/api'

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
    return instance.post(`/userdocs/set/${id}`, data, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
  deleteRecord(id: string, token: string) {
    return instance.post(`/userdocs/delete/${id}`, null, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
}

// types
export type FetchTableResponse<D = {}> = {
  error_code: number
  error_message: string
  data: D[]
  profiling: string
  timings?: any
}
export type TableData = {
  id: string
  documentStatus: string
  employeeNumber: string
  documentType: string
  documentName: string
  companySignatureName: string
  employeeSignatureName: string
  employeeSigDate: string
  companySigDate: string
}

export type CreateResponseRecord<D = {}> = {
  error_code: number
  error_message: string
  data: D
  profiling: string
  timings?: null
}
export type Record = {
  id: string
  documentStatus: string
  employeeNumber: string
  documentType: string
  documentName: string
  companySignatureName: string
  employeeSignatureName: string
  employeeSigDate: string
  companySigDate: string
}
