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
