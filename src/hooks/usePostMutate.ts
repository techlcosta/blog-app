import { api } from '@/api'
import { ApiErrorHandler } from '@/errors/apiError'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type IPost = FormData

interface IPostError {
  message: string
  code: string
}

async function createPost(data: IPost): Promise<void> {
  try {
    await api.post('/post/create', data)
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

export function useCreatePostMutate(): UseMutationResult<unknown, IPostError, IPost> {
  const mutate = useMutation<unknown, IPostError, IPost>({
    mutationFn: createPost
  })

  return mutate
}
