import { PostCard } from '@/components/cardPost'
import { useGetPosts } from '@/hooks/usePostsData'
import { useUserStore } from '@/stores/user'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, type ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

const Container = styled(Mui.Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`

export function Posts(): ReactElement {
  const location = useLocation()

  const category = location.pathname.replace(/[^a-zA-Z]+/g, '')

  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  const { data, refetch } = useGetPosts({ page: 1, limit: 10, category, isAuthenticated })

  useEffect(() => {
    void refetch()
  }, [category, refetch])
  return (
    <Container maxWidth="lg">
      {Boolean(data?.posts) && data?.posts.map((post) => <PostCard key={post._id} post={post} />)}
    </Container>
  )
}
