import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectAppStatus } from '@/app/model/appSelectors'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import { logout } from '@/features/auth/model/slice/authSlice'
import { useCallback } from 'react'
import { Container, Typography } from '@mui/material'
import StyleIcon from '@mui/icons-material/Style'

export const Header = () => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch, isLoggedIn])

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '2px' }}>
      <AppBar
        color="default"
        position="fixed"
        sx={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyleIcon sx={{ color: '#366EFF', marginRight: '8px' }} />
            <Typography variant="h6" component="div" sx={{ color: '#000' }}>
              Table
            </Typography>
          </Box>
          {isLoggedIn && (
            <Button onClick={handleLogout} variant="contained" color="primary">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {status === 'loading' && (
        <LinearProgress
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            zIndex: 10,
          }}
        />
      )}
    </Box>
  )
}
