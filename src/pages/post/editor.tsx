import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatStrikethroughOutlined,
  RedoOutlined,
  UndoOutlined
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { EditorContent, type Editor as TiptapEditor } from '@tiptap/react'
import { type ReactElement } from 'react'

const Content = styled(EditorContent)`
  padding: 1.5rem;
  outline: none;
  border: 2px solid;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.palette.action.selected};
  &:focus-within {
    border: 2px solid;
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  .custom {
    min-height: 200px;
    outline: none;
  }
`

const Menu = styled('div')`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
`

const Button = styled('button')`
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  border-color: ${({ theme }) => theme.palette.action.selected};
  background-color: ${({ theme }) => theme.palette.background.default};

  &[data-is-active='true'] {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`

const Text = styled('span')`
  font-size: larger;
  font-weight: bold;
`

interface EditorProps {
  editor: TiptapEditor | null
}

interface EditorMenuProps {
  editor: TiptapEditor | null
}

export function Editor({ editor }: EditorProps): ReactElement {
  return <Content editor={editor} />
}

export function EditorMenu({ editor }: EditorMenuProps): ReactElement | null {
  if (editor == null) {
    return null
  }
  return (
    <Menu>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-is-active={editor.isActive('bold')}
      >
        <FormatBoldOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-is-active={editor.isActive('italic')}
      >
        <FormatItalicOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-is-active={editor.isActive('strike')}
      >
        <FormatStrikethroughOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-is-active={editor.isActive('orderedList')}
      >
        <FormatListNumberedOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        data-is-active={editor.isActive('bulletList')}
      >
        <FormatListBulletedOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        data-is-active={editor.isActive('heading', { level: 1 })}
      >
        <Text>H1</Text>
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        data-is-active={editor.isActive('heading', { level: 2 })}
      >
        <Text>H2</Text>
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        data-is-active={editor.isActive('heading', { level: 3 })}
      >
        <Text>H3</Text>
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        data-is-active={editor.isActive('heading', { level: 4 })}
      >
        <Text>H4</Text>
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoOutlined />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoOutlined />
      </Button>
    </Menu>
  )
}
