import { useGetPost } from '@/hooks/usePostData'
import { useUserStore } from '@/stores/user'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { EditorContent, useEditor, type Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, type ReactElement } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Image } from './uploadImageInput'

const Container = styled(Mui.Container)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
`

export function Post(): ReactElement {
  const [searchParams] = useSearchParams()
  const postId = searchParams.get('post')

  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  const { data } = useGetPost({ isAuthenticated, postId })

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: ''
  })

  useEffect(() => {
    if (data?.content != null && editor != null) {
      const content: Content = JSON.parse(data.content) ?? {}

      editor.commands.setContent(content)
    }
  }, [data, editor])

  return (
    <Container>
      <Mui.Typography component="h1" fontSize="2rem" fontWeight="bold" textAlign="center">{data?.title}</Mui.Typography>
      <Image src={data?.imageUrl} />
      <EditorContent editor={editor} />
    </Container>
  )
}
