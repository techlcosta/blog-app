import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'
import { Menu } from './menu'

const Container = styled(Mui.Box)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export function DesktopMenu():ReactElement {
  return (
    <Container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Menu/>
    </Container>
  )
}
