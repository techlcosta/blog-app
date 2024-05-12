import { indigo, pink, purple } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

const Container = styled('div')`
  width: fit-content;
  border-radius: 6px;
  padding: 2px;
  background: linear-gradient(to left, ${indigo[500]}, ${purple[500]}, ${pink[500]});
`

const Button = styled(NavLink)`
  display: block;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.palette.text.secondary};
  background: ${({ theme }) => theme.palette.background.paper};

  &:hover {
    transition: all 0.5s ease;
    color: white;
    background: linear-gradient(to left, ${indigo[500]}, ${purple[500]}, ${pink[500]});
  }
`

export function SignInButton(): ReactElement {
  return (
    <Container>
      <Button to="/sign-in">Sign In </Button>
    </Container>
  )
}
