import { useUserStore } from '@/stores/user'
import { Logout, PostAdd, Settings } from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

const Box = styled(Mui.Box)`
  display: inline-flex;
  align-items: center;
  gap: 2rem;
`

const IconButton = styled(Mui.IconButton)`
  &:hover {
    transition: background-color 0.5s ease;
  }
  transition: background-color 0.5s ease;
`

const Menu = styled(Mui.Menu)`
  & .MuiMenu-list {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`

const MenuItem = styled(Mui.MenuItem)`
  &:hover {
    transition: background-color 0.5s ease;
    filter: brightness(1.5);
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: ${({ theme }) => theme.palette.background.default};
  }
  transition: background-color 0.5s ease;
`

const ItemBox = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`
interface ItemTextProps {
  fontSize: 'small' | 'medium' | 'large'
}

const ItemText = styled(Mui.Typography)<ItemTextProps>`
  font-size: ${({ fontSize }) => fontSize};
`

export function UserMenu(): ReactElement {
  const navigate = useNavigate()
  const { logout, user } = useUserStore()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>): void {
    setAnchorElUser(event.currentTarget)
  }

  function handleMenuItem(route?: string): void {
    setAnchorElUser(null)
    if (route != null) navigate(route)
  }

  function handleSignOut(route?: string): void {
    logout()
    setAnchorElUser(null)
    if (route != null) navigate(route)
  }

  return (
    <Box>
      <Mui.Tooltip title="Open settings">
        <IconButton size="small" id="user-menu-button" onClick={handleOpenUserMenu}>
          <Mui.Avatar
            sx={{ width: 36, height: 36 }}
            alt="Profile"
            src={user?.image}
          />
        </IconButton>
      </Mui.Tooltip>
      <Menu
        id="user-menu"
        open={Boolean(anchorElUser)}
        anchorEl={anchorElUser}
        onClose={() => {
          handleMenuItem()
        }}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button'
        }}
      >
        {user?.role === 'admin' && (
          <MenuItem
            onClick={() => {
              handleMenuItem('/post/create')
            }}
          >
            <ItemBox>
              <PostAdd fontSize="small" />
              <ItemText fontSize="medium">New Post</ItemText>
            </ItemBox>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleMenuItem("/settings")
          }}
        >
          <ItemBox>
            <Settings fontSize="small" />
            <ItemText fontSize="medium">Settings</ItemText>
          </ItemBox>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleSignOut('/')
          }}
        >
          <ItemBox>
            <Logout fontSize="small" />
            <ItemText fontSize="medium">Sign Out</ItemText>
          </ItemBox>
        </MenuItem>
      </Menu>
    </Box>
  )
}
