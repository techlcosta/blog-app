import { styled } from '@mui/material/styles'
export const InputImage = styled('input')`
  display: none;
`

export const Image = styled('img')`
  width: 100%;
  min-width: 300px;
  min-height: 150px;
  max-height: 500px;
  object-fit: contain;
`

export const UploadImage = styled('label')`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0.25rem;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    transition: all 0.5s ease;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`
