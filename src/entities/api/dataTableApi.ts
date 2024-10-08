import { instance } from '@/shared/api'
import { Record, ResponseData, Table } from '../model/types'
import axios, { AxiosRequestConfig } from 'axios'

const token = localStorage.getItem('authToken')

export const dataTableAPI = {
  fetchTableData() {
    return instance.get<ResponseData<Table[]>>('/ru/data/v3/testmethods/docs/userdocs/get', {
      headers: { 'x-auth': token },
    } as AxiosRequestConfig)
  },
  createRecord(data: Record) {
    return instance.post<ResponseData<Record>>(
      '/ru/data/v3/testmethods/docs/userdocs/create',
      data,
      {
        headers: { 'x-auth': token },
      } as AxiosRequestConfig
    )
  },
  updateRecord(id: string, data: Record) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, data, {
      headers: { 'x-auth': token },
    } as axios.AxiosRequestConfig<any> | undefined)
  },
  deleteRecord(id: string) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, null, {
      headers: { 'x-auth': token },
    } as AxiosRequestConfig)
  },
}

// types
export type CreateRecordResErrors<D> = {
  errors: D
  type: string
  title: string
  status: number
  traceId: string
}

export type CreateRecordResError = {
  documentName: string[]
  documentStatus: string[]
}

type AxiosRequestConfig = axios.AxiosRequestConfig<any> | undefined
