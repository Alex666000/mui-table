import { instance } from '@/shared/api'
import { LoginParams, BadRequest } from '@/features/auth/model/type'

export const authAPI = {
  login(arg: LoginParams) {
    const { email, password } = arg
    return instance.post<BadRequest>('/ru/data/v3/testmethods/docs/login', {
      email,
      password,
    })
  },
}
