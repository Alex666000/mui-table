import { ChangeEvent, FC, useState, FocusEvent } from 'react'
import TextField from '@mui/material/TextField'
import { EyeIcon } from '@/shared/ui/EyeIcon/EyeIcon'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

type PasswordInputPropsType = {
  type?: 'password'
  label?: 'Password'
  margin?: string
  name?: 'password'
  value?: string
  onChange?: (e: ChangeEvent<any>) => void
  onBlur?: (e: FocusEvent<any>) => void
  error?: false | boolean | undefined | string
  helperText?: string | undefined
  eye?: boolean // должен ли быть глаз возле инпута, переключающий типы text/password
}

export const PasswordInput: FC<PasswordInputPropsType> = (props) => {
  const {
    label,
    margin,
    name,
    type,
    helperText,
    error,
    value,
    onChange,
    onBlur,
    eye = false,
  } = props

  // Используем начальное значение false, чтобы начинать с type='password'
  const [typeText, setTypeText] = useState(false)

  const showPassword = () => {
    setTypeText((prev) => !prev) // Переключение состояния при каждом клике
  }

  return (
    <div className="passwordWrapper" style={{ position: 'relative' }}>
      <TextField
        sx={{ width: '100%' }}
        type={typeText ? 'text' : 'password'} // Обновление type в зависимости от state
        label={label}
        margin={margin as any}
        name={name}
        value={value}
        autoComplete="on"
        variant="standard"
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={helperText}
      />
      {eye && (
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
          onClick={showPassword} // Клик вызывает showPassword
        >
          <EyeIcon passwordVisible={typeText} />
        </div>
      )}
    </div>
  )
}
