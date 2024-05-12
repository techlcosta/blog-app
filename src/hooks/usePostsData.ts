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
  page: number
  limit: number
  category?: string
  isAuthenticated: boolean
}

interface IGetPostReponse {
  total: number
  posts: IPost[]
}

interface IGetPostError {
  message: string
  code: string
}

async function getPosts({ page, limit, category, isAuthenticated }: IGetPostRequest): Promise<IGetPostReponse> {
  try {
    const path = isAuthenticated ? '/post' : 'post/public'
    const response = await api.get<IGetPostReponse>(path, { params: { page, limit, category } })
    
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

export function useGetPosts(
  params: IGetPostRequest
): UseQueryResult<IGetPostReponse, IGetPostError> {
  const query = useQuery<IGetPostReponse, IGetPostError>({
    queryFn: async () => await getPosts(params),
    queryKey: ['posts']
  })

  return query
}
