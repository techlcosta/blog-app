import { api } from '@/api'
import { ApiErrorHandler } from '@/errors/apiError'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface ISignUpCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
}


interface ISignUpError {
  message: string
  code: string
}

async function signUp(credentials: ISignUpCredentials): Promise<void> {
  try {
     await api.post('/user/sign-up', credentials)

    
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError && error.response?.data != null)
      throw new ApiErrorHandler(
        error.response.data.message as string,
        error.response.data.code as string
      )
    else throw new ApiErrorHandler('Unknown error occurred.')
  }
}

export function useSignUpMutate(): UseMutationResult<
  unknown,
  ISignUpError,
  ISignUpCredentials
> {
  const mutate = useMutation<unknown, ISignUpError, ISignUpCredentials>({
    mutationFn: signUp
  })

  return mutate
}
