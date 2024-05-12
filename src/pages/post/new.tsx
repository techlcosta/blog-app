import { Button } from '@/components/button'
import { TextField } from '@/components/input'
import { useCreatePostMutate } from '@/hooks/usePostMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload } from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { type Editor as TiptapEditor } from '@tiptap/core'
import { type Transaction } from '@tiptap/pm/state'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Editor, EditorMenu } from './editor'
import { Select } from './select'
import { Image, InputImage, UploadImage } from './uploadImageInput'

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif'
]

const schema = z.object({
  title: z.string().min(6, { message: 'Title must have at least 6 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  permission: z.string().min(1, { message: 'Permission is required.' }),
  content: z.string().min(100, { message: 'Post must have at least 15 characters.' }),
  image: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length === 1 && ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      {
        message:
          'Valid image is required, Only .jpg, .jpeg, avif, .png and .webp formats are supported.'
      }
    )
    
})

type PostFormInputs = z.infer<typeof schema>

interface HandleUpdateProps {
  editor: TiptapEditor
  transaction: Transaction
}

const Container = styled(Mui.Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export function NewPost(): ReactElement {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { mutateAsync } = useCreatePostMutate()

  const {
    watch,
    reset,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
      permission: ''
    }
  })

  function handleUpdate({ editor }: HandleUpdateProps): void {
    setValue('content', JSON.stringify(editor.getJSON()))
  }

  const editor = useEditor({
    extensions: [StarterKit],
    editable: true,
    content: '',
    editorProps: {
      attributes: {
        class: 'custom'
      }
    },
    onUpdate: handleUpdate
  })

  const onSubmit: SubmitHandler<PostFormInputs> = async (form) => {
    const data = new FormData()

    data.append('title', form.title)
    data.append('category', form.category)
    data.append('permission', form.permission)
    data.append('content', form.content)
    data.append('file', form.image[0])

    try {
      await mutateAsync(data)
      reset()
      setImagePreview(null)
      editor?.commands.clearContent()
    } catch (error) {}
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'image' && value.image?.[0] != null) {
        const file = value.image[0]
        const newImagePreview = URL.createObjectURL(file)
        setImagePreview((prev) => {
          if (prev != null) URL.revokeObjectURL(prev)
          return newImagePreview
        })
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, imagePreview])

  return (
    <Container maxWidth="lg">
      <Mui.Typography textAlign="center" variant="h4">
        Create a post
      </Mui.Typography>
      <Mui.Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2}
      >
        <Select
          name="category"
          label="Category"
          id="select-category"
          labelId="select-category-label"
          control={control}
        >
          <Mui.MenuItem value="forex">Forex</Mui.MenuItem>
          <Mui.MenuItem value="stocks">Stocks</Mui.MenuItem>
          <Mui.MenuItem value="cryptocurrency">Cryptocurrency</Mui.MenuItem>
        </Select>

        <Select
          name="permission"
          label="Permission"
          id="select-permission"
          labelId="select-permission-label"
          control={control}
        >
          <Mui.MenuItem value="public">Public</Mui.MenuItem>
          <Mui.MenuItem value="subscriber">Subiscriber</Mui.MenuItem>
        </Select>
      </Mui.Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          autoFocus
          fullWidth
          size="medium"
          id="title"
          type="title"
          label="Title"
          variant="outlined"
          color="primary"
          {...register('title')}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />

        <Mui.Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <UploadImage htmlFor="image-upload">
            {imagePreview != null ? (
              <Image src={imagePreview} alt="" />
            ) : (
              <>
                <CloudUpload fontSize="large" />
                <Mui.Typography fontSize="1.5rem">Choose a image</Mui.Typography>
              </>
            )}
            <InputImage type="file" id="image-upload" accept="image/*" {...register('image')} />
          </UploadImage>
          <Mui.FormControl error={Boolean(errors.image?.message)} component="fieldset">
            <Mui.FormHelperText>{errors.image?.message}</Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Box>
        <Mui.Box>
          <EditorMenu editor={editor} />
          <Editor editor={editor} />
          <Mui.FormControl error={Boolean(errors.content?.message)} component="fieldset">
            <Mui.FormHelperText>{errors.content?.message}</Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Box>

        <Button bgColor="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}
