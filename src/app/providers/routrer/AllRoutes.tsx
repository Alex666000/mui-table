import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/paths'
import { MainPage } from '@/pages/MainPage'
import { LoginPage } from '@/pages/LoginPage'
import { ErrorPage } from '@/pages/ErrorPage'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.main} element={<MainPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.error} element={<ErrorPage />} />
      <Route path="*" element={<Navigate to={ROUTES.error} />} />
    </Routes>
  )
}
