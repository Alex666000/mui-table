import { AppSnackbar } from '@/shared/ui/AppSnackbar'
import { Header } from '@/widgets/Header/Header'
import { AllRoutes } from './providers/routrer'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectIsInitialized } from '@/app/model/appSelectors'
import { GlobalAppLoader } from '@/shared/ui/GlobalAppLoader/GlobalAppLoader'
import { useEffect } from 'react'
import { setAppInitialized } from './model'
import s from './App.module.scss'

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
