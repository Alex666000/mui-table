import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectAppError } from '@/app/model/appSelectors'
import { setAppError, setAppStatus } from '@/app/model/appReducer'

export function AppSnackbar() {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
    dispatch(setAppStatus({ status: '' }))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
