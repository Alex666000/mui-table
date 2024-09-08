import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import { Slide } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectAppError, selectAppSuccess } from '@/app/model/appSelectors'
import { setAppError, setAppStatus, setAppSuccess } from '@/app/model/appSlice'

const Transition = (props) => {
  return <Slide {...props} direction="up" children={props.children} />
}

export function AppSnackbar() {
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectAppError)
  const successMessage = useAppSelector(selectAppSuccess)

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
    dispatch(setAppSuccess({ message: '' }))
    dispatch(setAppStatus({ status: '' }))
  }

  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={Transition}
        TransitionProps={{ timeout: { enter: 500, exit: 500 } }} // Плавное закрытие
        sx={{ '& .MuiSnackbarContent-root': { transition: 'opacity 0.5s ease-in-out' } }} // Плавное изменение прозрачности
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={Transition}
        TransitionProps={{ timeout: { enter: 500, exit: 500 } }}
        sx={{ '& .MuiSnackbarContent-root': { transition: 'opacity 0.5s ease-in-out' } }}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
