import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { ErrorImage } from '@/shared/assets/images/ErrorImage/ErrorImage'
import { ROUTES } from '@/shared/constants/paths'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Grid
      alignItems={'center'}
      container
      direction={'column'}
      gap={2}
      justifyContent={'center'}
      sx={{ paddingTop: 8 }}>
      <Typography fontSize={'xxx-large'} fontWeight={'bold'} variant={'h1'}>
        Ooops!
      </Typography>
      <Typography fontSize={'larger'}>
        Sorry, an unexpected error has occurred or page not found!
      </Typography>
      <ErrorImage />
      <Button onClick={() => navigate(ROUTES.login)} size={'large'} variant={'contained'}>
        Back to home page
      </Button>
    </Grid>
  )
}
