import { indigo, pink, purple } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface LogoStyleProps {
  size: 'small' | 'medium' | 'large' | 'x-large'
}
const Container = styled(Link)<LogoStyleProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '1.5rem'
      case 'medium':
        return '2rem'
      case 'large':
        return '3rem'
      case 'x-large':
        return '3rem'
      default:
        return '1.5rem'
    }
  }};
`

const Span = styled('span')<LogoStyleProps>`
  color: white;
  font-weight: bold;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(to right, ${indigo[500]}, ${purple[500]}, ${pink[500]});
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '1.125rem'
      case 'medium':
        return '1.5rem'
      case 'large':
        return '2.25rem'
      case 'x-large':
        return '3rem'
      default:
        return '1.125rem'
    }
  }};
`
interface LogoProps {
  to: string
  size: 'small' | 'medium' | 'large' | 'x-large'
}
export function Logo({to, size = 'small' }: LogoProps): ReactElement {
  return (
    <Container size={size} to={to}>
      <Span size={size}>DX</Span>
      Markets
    </Container>
  )
}
