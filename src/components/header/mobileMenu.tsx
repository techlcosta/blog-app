import * as MuiIcons from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, type ReactElement } from 'react'
import { Menu } from './menu'

const Nav = styled(Mui.Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`

export function MobileMenu(): ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen)
  }

  return (
    <Mui.Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
      <Mui.IconButton size="large" onClick={toggleDrawer(true)}>
        <MuiIcons.Menu fontSize="large" />
      </Mui.IconButton>
      <Mui.Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' } }}
      >
        <Nav sx={{ width: 250 }} role="presentation">
          <Menu />
        </Nav>
      </Mui.Drawer>
    </Mui.Box>
  )
}
