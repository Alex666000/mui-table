import { authAPI } from '@/features/auth/api'

// responses
export type BaseResponse<D = {} | null> = {
  error_code: number
  data: D // success -> { token: string } "or" error -> null
  profiling: string
  timings?: any
}

export type BadRequest = BaseResponse & {
  error_message: string
}

export type BadRequest = BaseResponse & {
  error_text: string
}

// params types
export type LoginParams = {
  email: string
  password: string
}
