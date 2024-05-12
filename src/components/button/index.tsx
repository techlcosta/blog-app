import { grey, indigo, pink, purple } from '@mui/material/colors'
import { styled } from '@mui/material/styles'

interface ButtonProps {
  bgColor: 'primary' | 'secondary'
}

export const Button = styled('button')<ButtonProps>`
  border: none;
  height: 3.25rem;
  font-size: large;
  text-transform: none;
  border-radius: 4px;
  transition: all 0.5s ease;
  background: linear-gradient(
    to left,
    ${({ theme, bgColor }) => (bgColor === 'primary' ? theme.palette.primary.dark : indigo[500])},
    ${({ theme, bgColor }) => (bgColor === 'primary' ? theme.palette.primary.main : purple[500])},
    ${({ theme, bgColor }) => (bgColor === 'primary' ? theme.palette.primary.light : pink[500])}
  );

  color: ${grey[100]};

  &:hover {
    transition: all 0.5s ease;
    filter: brightness(1.5);
  }
`
