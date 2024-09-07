import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useAppDispatch } from '@/app/providers/store/store'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import { selectAppStatus } from '@/app/model'
import { EMPTY_STRING, ROUTES } from '@/shared/constants'
import { UnknownAction } from '@reduxjs/toolkit'
import { FormWrapper } from '@/shared/ui/FormWrapper'
import { PasswordInput } from '@/shared/ui/PasswordInput'
import { ButtonSpinner } from '@/shared/ui/ButtonSpinner'
import { authThunks } from '@/features/auth/model/slice/authSlice'
import s from './LoginPage.module.scss'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const status = useSelector(selectAppStatus)

  const formik = useFormik({
    validate: (values) => {
      const errors: { email?: string; password?: string } = {}
      if (!values.email) {
        errors.email = 'Email is required'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      }
      return errors
    },
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
    },
    onSubmit: (values) => {
      dispatch(authThunks.login(values) as UnknownAction)
    },
  })

  if (isLoggedIn) {
    return <Navigate to={ROUTES.main} />
  }

  return (
    <FormWrapper
      description={`Don't have an account?`}
      onSubmit={formik.handleSubmit}
      title={'Sign in'}
      titleButton={'Sign in'}>
      <TextField
        label="Email"
        margin="normal"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!formik.errors.email && formik.touched.email}
        helperText={
          formik.errors.email && formik.touched.email ? formik.errors.email : EMPTY_STRING
        }
        variant="standard"
      />
      <PasswordInput
        type="password"
        label="Password"
        margin="normal"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!formik.errors.password && formik.touched.password}
        helperText={
          formik.errors.password && formik.touched.password ? formik.errors.password : EMPTY_STRING
        }
        eye={true}
      />
      <Button
        sx={{ margin: '0 auto' }}
        disabled={
          !formik.values.email ||
          !formik.values.password ||
          !!formik.errors.email ||
          !!formik.errors.password ||
          status === 'loading'
        }
        type="submit"
        color="primary">
        {status === 'loading' ? <ButtonSpinner className={s.spinner} /> : 'Login'}
      </Button>
    </FormWrapper>
  )
}
