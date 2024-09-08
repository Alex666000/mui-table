import { instance } from '@/shared/api'
import { ResponseData } from '@/entities/model/types'

export const authAPI = {
  login(data: LoginParams) {
    const { email, password } = data
    return instance.post<ResponseData>('/ru/data/v3/testmethods/docs/login', {
      email,
      password,
    })
  },
}

// params type
export type LoginParams = {
  email: string
  password: string
}
