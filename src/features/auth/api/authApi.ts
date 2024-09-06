import { instance } from '@/shared/api'
import { LoginParams, LoginSuccessResponse } from '@/features/auth/model/type'

export const authAPI = {
  login(data: LoginParams) {
    const { email, password } = data
    return instance.post<LoginSuccessResponse>('/ru/data/v3/testmethods/docs/login', {
      email,
      password,
    })
  },
}
