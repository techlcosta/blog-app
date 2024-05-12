import { Button } from '@/components/button'
import { Logo } from '@/components/header/logo'
import { TextField } from '@/components/input'
import { useSignUpMutate } from '@/hooks/useSignUpMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, type ReactElement } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const Container = styled(Mui.Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const Form = styled('form')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const SignIn = styled(Link)`
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: cornflowerblue;
  transition: all 0.5s ease;

  &:hover {
    transition: all 0.5s ease;
    filter: brightness(1.3);
  }
`

const schema = z.object({
  firstName: z.string().min(3, { message: 'Username must have at least 3 characters.' }),
  lastName: z.string().min(3, { message: 'Username must have at least 3 characters.' }),
  email: z.string().email({ message: 'Email invalid.' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters.' })
})

type SignInFormInputs = z.infer<typeof schema>

export function SignUp(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormInputs>({ resolver: zodResolver(schema) })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { mutateAsync, isSuccess, isError, error } = useSignUpMutate()

  function handleClickShowPassword(): void {
    setShowPassword((show) => !show)
  }

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    await mutateAsync(data)
  }

  return (
    <Container maxWidth="xs">
      <Mui.Box display="inline-flex" justifyContent="center" alignItems="center">
        <Logo to="/sign-in" size="large" />
      </Mui.Box>
      {isSuccess ? (
        <>
          <Mui.Alert severity="success">Profile successfully created.</Mui.Alert>
          <SignIn to="/sign-in">Sign in</SignIn>
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              size="medium"
              id="firstName"
              type="firstName"
              fullWidth
              label="First Name"
              variant="outlined"
              color="primary"
              autoFocus
              autoComplete="firstName"
              {...register('firstName')}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
            <TextField
              size="medium"
              id="lastName"
              type="lastName"
              fullWidth
              label="Last Name"
              variant="outlined"
              color="primary"
              autoComplete="lastName"
              {...register('lastName')}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
            <TextField
              size="medium"
              id="email"
              type="email"
              fullWidth
              label="E-mail"
              variant="outlined"
              color="primary"
              autoComplete="email"
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              id="password"
              size="medium"
              variant="outlined"
              fullWidth
              label="Password"
              color="primary"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={Boolean(errors.password)}
              InputProps={{
                endAdornment: (
                  <Mui.IconButton onClick={handleClickShowPassword} aria-label="password">
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </Mui.IconButton>
                )
              }}
              helperText={errors.password?.message}
            />

            <Button bgColor="secondary" type="submit">
              Sign Up
            </Button>

            {isError && <Mui.Alert severity="error">{error.message}</Mui.Alert>}
          </Form>
          <Mui.Typography>
            Do you already have an account ? <SignIn to="/sign-in">Sign in</SignIn>
          </Mui.Typography>
        </>
      )}
    </Container>
  )
}
