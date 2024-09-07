// responses
export type BaseResponse<D = {} | null> = {
  error_code: number
  data: D // success -> { token: string } "or" error -> null
  profiling: string
  timings?: any
}

export type LoginSuccessResponse = BaseResponse & {
  error_message: string
}

export type BadRequest = BaseResponse & {
  error_text: string
}

// params type
export type LoginParams = {
  email: string
  password: string
}
