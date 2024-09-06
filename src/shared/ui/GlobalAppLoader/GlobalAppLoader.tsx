import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const GlobalAppLoader = () => {
  return (
    <Box sx={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <CircularProgress />
    </Box>
  )
}
