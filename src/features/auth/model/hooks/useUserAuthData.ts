import { useParams } from 'react-router-dom'

import { developers, useAppDispatch, useAppSelector } from 'common'
import {
  LoginFormDataType,
  RegisterFormDataType,
  authLoggedIn,
  authMailSent,
  authPasswordSent,
  authRegistered,
  forgotTC,
  logOutTC,
  loginTC,
  registerMeTC,
  setNewPasswordTC,
} from 'features/auth'

export const useUserAuthData = () => {
  // селекторами достаем актуальные значения из стейта
  const isLoggedIn = useAppSelector(authLoggedIn)
  const isRegistered = useAppSelector(authRegistered)
  const isMailSent = useAppSelector(authMailSent)
  const isPasswordSent = useAppSelector(authPasswordSent)

  const dispatch = useAppDispatch()

  // токен достаем из URL адресной строки
  const { token } = useParams<{ token: string }>()

  // поля формы что ввели в них
  const onLogin = (data: LoginFormDataType) => {
    dispatch(loginTC(data))
  }

  // поля формы что ввели в них
  const onRegister = (data: RegisterFormDataType) => {
    dispatch(registerMeTC(data))
  }

  const onEmailSent = (data: { email: string }) => {
    dispatch(forgotTC({ ...data, ...developers }))
  }

  const onNewPasswordSent = (data: { password: string }) => {
    dispatch(setNewPasswordTC({ ...data, resetPasswordToken: token as string }))
  }

  const onLogout = () => {
    // диспатчим санку для вылогинивания
    dispatch(logOutTC())
  }

  return {
    isLoggedIn,
    isMailSent,
    isPasswordSent,
    isRegistered,
    onEmailSent,
    onLogin,
    onLogout,
    onNewPasswordSent,
    onRegister,
  }
}
