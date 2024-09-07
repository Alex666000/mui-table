import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import { ROUTES } from '@/shared/constants/paths'
import { Navigate } from 'react-router-dom'
import { selectAppStatus } from '@/app/model/appSelectors'
import LinearProgress from '@mui/material/LinearProgress'
import { DataTable } from '@/entities/ui'
import { ReturnComponent } from '@/shared/types'

export const MainPage = (): ReturnComponent => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const status = useSelector(selectAppStatus)

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.login} />
  }
  return (
    <div style={{ marginTop: '40px' }}>
      {status === 'loading' ? <LinearProgress /> : <DataTable />}
    </div>
  )
}
