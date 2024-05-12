import { api } from '@/api'
import { ApiErrorHandler } from '@/errors/apiError'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export interface IPost {
  _id: string
  title: string
  slug: string
  category: string
  content: string
  imageUrl: string
  imageName: string
  permission: string
  createdBy: {
    _id: string
    firstName: string
    image: string
  }
  createdAt: Date
  updatedAt: Date
}

interface IGetPostRequest {
  postId: string | null
  isAuthenticated?: boolean
}

interface IGetPostError {
  message: string
  code: string
}

async function getPost({ postId, isAuthenticated = true }: IGetPostRequest): Promise<IPost> {
  try {
    const path = isAuthenticated ? '/post/article' : 'post/public/article'
    const response = await api.get<IPost>(path, { params: { postId } })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data != null)
      throw new ApiErrorHandler(
        error.response.data.message as string,
        error.response.data.code as string
      )
    else throw new ApiErrorHandler('Unknown error occurred.')
  }
}

export function useGetPost(params: IGetPostRequest): UseQueryResult<IPost, IGetPostError> {
  const query = useQuery<IPost, IGetPostError>({
    queryFn: async () => await getPost(params),
    queryKey: ['posts']
  })

  return query
}
