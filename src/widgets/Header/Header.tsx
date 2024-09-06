import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store'
import { selectAppStatus } from '@/app/model/appSelectors'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import { logout } from '@/features/auth/model/slice/authSlice'
import { useCallback } from 'react'

export const Header = () => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch, isLoggedIn])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="p" sx={{ flexGrow: 1 }}>
            Table
          </Typography>
          {isLoggedIn && (
            <Button onClick={handleLogout} color="primary">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
    </Box>
  )
}
