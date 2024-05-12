import { Button } from '@/components/button'
import { Logo } from '@/components/header/logo'
import { TextField } from '@/components/input'
import { useSignInMutate } from '@/hooks/useSignInMutate'
import { useUserStore } from '@/stores/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const Container = styled(Mui.Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const Box = styled(Mui.Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Form = styled('form')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SignUp = styled(Link)`
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
  email: z.string().email({ message: 'Email invalid.' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters.' })
})

type SignInFormInputs = z.infer<typeof schema>

export function SignIn(): ReactElement {
  const navigate = useNavigate()
  const { mutateAsync, isSuccess, isError, error } = useSignInMutate()
  const setUser = useUserStore((state) => state.setUser)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormInputs>({ resolver: zodResolver(schema) })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  function handleClickShowPassword(): void {
    setShowPassword((show) => !show)
  }

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    const response = await mutateAsync(data)

    setUser(response)
  }

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  return (
    <Container maxWidth="xs">
      <Box>
        <Logo to="/sign-in" size="large" />
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="medium"
          id="email"
          type="email"
          fullWidth
          label="E-mail"
          variant="outlined"
          color="primary"
          autoFocus
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

        <Button bgColor="primary" type="submit">
          Sign In
        </Button>

        {isError && <Mui.Alert severity="error">{error.message}</Mui.Alert>}

        <Mui.Typography>
          Dont Have an account? <SignUp to="/sign-up">Sign up</SignUp>
        </Mui.Typography>
      </Form>
    </Container>
  )
}
