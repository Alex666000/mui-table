import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/paths'
import { lazy, Suspense } from 'react'

// Асинхронные импорты для страниц
const MainPage = lazy(() => import('@/pages/MainPage/ui/MainPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage/ui/LoginPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ui/ErrorPage'))

export const AllRoutes = () => {
  return (
    <Suspense fallback={''}>
      <Routes>
        <Route path={ROUTES.main} element={<MainPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.error} element={<ErrorPage />} />
        <Route path="*" element={<Navigate to={ROUTES.error} />} />
      </Routes>
    </Suspense>
  )
}
