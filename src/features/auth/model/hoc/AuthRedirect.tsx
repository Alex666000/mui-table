import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { paths } from '@/shared/constants'
import { useUserAuthData } from '@/features/auth/model/hooks/useUserAuthData'

/**
 * AuthRedirect: обрабатывает перенаправление пользователя в зависимости от его аутентификации
 */

export const AuthRedirect = () => {
  // Получает текущее состояние аутентификации пользователя -залогинен?
  const { isLoggedIn } = useUserAuthData()

  // Получает текущее местоположение
  const location = useLocation()

  // Если пользователь аутентифицирован то Аутлет
  if (!isLoggedIn) {
    // для перенаправления пользователя обратно на страницу, которую он пытался посетить до входа в систему
    return <Navigate state={{ from: location }} to={paths.LOGIN} />
  }

  return <Outlet />
}
