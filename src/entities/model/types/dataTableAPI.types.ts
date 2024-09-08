import { instance } from '@/shared/api'

export type BaseResponse = {
  error_code: number
  profiling: string
  timings?: null
}

export type ResponseData<D = {}> = BaseResponse & {
  error_message: string
  data?: D
}

export type BadRequestResData = BaseResponse & {
  error_text: string
  data?: null
}

export type ResponseData<D = {}> = {
  error_code: number
  error_message: string
  data?: D
  profiling: string
  timings?: null
}

export type BadRequestResData = {
  error_code: number
  error_text: string
  data?: null
  profiling: string
  timings?: null
}

export type Table = {
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
  data: Table[]
  isDataLoaded: boolean
}
