import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import { ROUTES } from '@/shared/constants/paths'
import { Navigate } from 'react-router-dom'
import { selectAppStatus } from '@/app/model/appSelectors'
import LinearProgress from '@mui/material/LinearProgress'
import { DataTable } from '@/entities/ui'

export const MainPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const status = useSelector(selectAppStatus)

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.login} />
  }
  return <div>{status === 'loading' ? <LinearProgress /> : <DataTable />}</div>
}
