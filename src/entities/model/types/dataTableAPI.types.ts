import { instance } from '@/shared/api'

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

export type PostRequestMethod = ReturnType<typeof instance.post>
export type GetRequestMethod = ReturnType<typeof instance.get>

export type TableState = {
  data: TableData[]
  isDataLoaded: boolean
}
