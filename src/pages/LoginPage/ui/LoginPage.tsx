import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authThunks } from '@/features/auth/model/slice/authSlice'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { FormWrapper } from '@/shared/ui/FormWrapper'
import { PasswordInput } from '@/shared/ui/PasswordInput'
import { ButtonSpinner } from '@/shared/ui/ButtonSpinner'
import s from './LoginPage.module.scss'
import { EMPTY_STRING, ROUTES } from '@/shared/constants'
import { selectAppStatus } from '@/app/model'
import { selectIsLoggedIn, selectNeedsReload } from '@/features/auth/model/selectors'
import { useAppDispatch } from '@/app/providers/store/store'
import { UnknownAction } from '@reduxjs/toolkit'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const needsReload = useSelector(selectNeedsReload)
  const status = useSelector(selectAppStatus)

  useEffect(() => {
    if (needsReload) {
      window.location.reload()
    }
  }, [needsReload])

  const formik = useFormik({
    validate: (values) => {
      const errors: { email?: string; password?: string } = {}
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[a-zA-Z]+\d+$/.test(values.email)) {
        errors.email = 'The name must be in English in the format: user{N} e.g. user13'
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
    onSubmit: (values, { setSubmitting }) => {
      dispatch(authThunks.login(values) as UnknownAction)
    },
  })

  if (isLoggedIn) {
    return <Navigate to={ROUTES.main} />
  }
  // console.log('render LoginPage')

  return (
    <FormWrapper
      description={`Don't have an account?`}
      onSubmit={formik.handleSubmit}
      title={'Sign in'}
      titleButton={'Sign in'}>
      <TextField
        label="Username"
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
        sx={{
          margin: '0 auto',
          backgroundColor:
            status === 'loading' ||
            !formik.values.email ||
            !formik.values.password ||
            !!formik.errors.email ||
            !!formik.errors.password
              ? 'grey'
              : 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor:
              status === 'loading' ||
              !formik.values.email ||
              !formik.values.password ||
              !!formik.errors.email ||
              !!formik.errors.password
                ? 'darkgrey'
                : 'primary.dark',
          },
        }}
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
export default LoginPage
