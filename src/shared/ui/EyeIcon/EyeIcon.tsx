import { FC } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

type EyeIconType = {
  passwordVisible: boolean
  showPassword: () => void
}

export const EyeIcon: FC<EyeIconType> = ({ passwordVisible, showPassword }) => {
  return (
    <IconButton
      onClick={showPassword}
      sx={{
        alignContent: 'center',
        color: '#000',
        opacity: '50%',
        // position: 'absolute',
        // top: '62%',
        // left: '50%',
        // transform: 'translate(50%, -50%)',
        width: '23px',
      }}>
      {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  )
}
// top: 62%;
//     /* left: 50%; */
//     transform: translate(-81%, -50%);
