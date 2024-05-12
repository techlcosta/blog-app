import { type IPost } from '@/hooks/usePostsData'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: IPost
}

const CardContent = styled(Mui.CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Card = styled(Mui.Card)`
  flex: 1 1;
  max-width: 100%;
  min-width: 345px;
`

const Title = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.palette.text.primary};
  text-decoration: underline;
`

export function PostCard({ post }: PostCardProps): ReactElement {
  return (
    <Card>
      <Mui.CardMedia component="img" height={294} src={post.imageUrl} />
      <CardContent>
        <Mui.Box display="inline-flex" alignItems="center" justifyContent="space-between">
          <Mui.Box display="inline-flex" alignItems="center" gap="0.5rem">
            <Mui.Avatar src={post.createdBy.image} sx={{ width: 28, height: 28 }} />
            <Mui.Typography>{post.createdBy.firstName}</Mui.Typography>
          </Mui.Box>
          <Mui.Chip clickable label={post.category} />
        </Mui.Box>
        <Title to={`/post?post=${post._id}`}>{post.title}</Title>
      </CardContent>
    </Card>
  )
}
