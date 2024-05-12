import { api } from '@/api'
import { ApiErrorHandler } from '@/errors/apiError'
import { type RoleType } from '@/stores/user'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface ISignInCredentials {
  email: string
  password: string
}

interface ISignInData {
  email: string
  fisrtName: string
  lastName: string
  image: string
  role: RoleType
}

interface ISignInError {
  message: string
  code: string
}

async function signIn(credentials: ISignInCredentials): Promise<ISignInData> {
  try {
    const { data } = await api.post('/user/sign-in', credentials)

    return data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data != null)
      throw new ApiErrorHandler(
        error.response.data.message as string,
        error.response.data.code as string
      )
    else throw new ApiErrorHandler('Unknown error occurred.')
  }
}

export function useSignInMutate(): UseMutationResult<
  ISignInData,
  ISignInError,
  ISignInCredentials
> {
  
  const mutate = useMutation<ISignInData, ISignInError, ISignInCredentials>({
    mutationFn: signIn
  })

  return mutate
}
