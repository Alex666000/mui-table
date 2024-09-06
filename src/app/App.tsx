import { AppSnackbar } from '@/shared/ui/AppSnackbar'
import Container from '@mui/material/Container'
import { Header } from '@/widgets/Header/Header'
import { AllRoutes } from '@/app/providers/routrer/AllRoutes'
import s from './styles/App.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectIsInitialized } from '@/app/model/appSelectors'
import { GlobalAppLoader } from '@/shared/ui/GlobalAppLoader/GlobalAppLoader'
import { useEffect } from 'react'
import { setAppInitialized } from '@/app/model/appReducer'

function App() {
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppInitialized({ isInitialized: true }))
  }, [dispatch, isInitialized])

  if (!isInitialized) {
    return <GlobalAppLoader />
  }

  return (
    <div className={s.main}>
      <AppSnackbar />
      <Header />
      <AllRoutes />
    </div>
  )
}

export default App
