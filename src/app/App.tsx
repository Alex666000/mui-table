import { AppSnackbar } from '@/shared/ui/AppSnackbar'
import { AllRoutes } from './providers/routrer'
import { useAppDispatch, useAppSelector } from './providers/store/store'
import { selectIsInitialized } from './model/appSelectors'
import { useEffect } from 'react'
import { setAppInitialized } from './model'
import { GlobalAppLoader } from '@/shared/ui/GlobalAppLoader'
import s from './App.module.scss'
import { Header } from '@/widgets/Header'

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
