import { indigo, pink, purple } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'

export const NavItem = styled(NavLink)`
  width: fit-content;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.palette.text.secondary};
  transition: all 0.5s ease;
  &:hover {
    filter: brightness(1.5);
    color: ${({ theme }) => theme.palette.text.primary};
  }
  &.active {
    border-image: linear-gradient(to right, ${indigo[700]}, ${purple[700]}, ${pink[700]});
    border-image-slice: 1;
    transition: all 0.5s ease;
  }
`
