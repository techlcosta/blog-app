import { ThemeContext } from '@/contexts/themeContext'
import * as MuiIcons from '@mui/icons-material'
import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, type ReactElement } from 'react'
// import { DesktopMenu } from './desktopMenu'
import { useUserStore } from '@/stores/user'
import { DesktopMenu } from './desktopMenu'
import { Logo } from './logo'
import { MobileMenu } from './mobileMenu'
import { SignInButton } from './signInButton'
import { ToogleTheme } from './toogleTheme'
import { UserMenu } from './userMenu'

const Wrapper = styled('header')`
  top: 0;
  left: 0;
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 6rem;
  min-height: 6rem;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.paper};
`

const Container = styled(Mui.Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Actions = styled(Mui.Box)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

export function Header(): ReactElement {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <MobileMenu />
        <Logo to="/" size="small" />
        <DesktopMenu />
        <Actions>
          {theme !== undefined && (
            <ToogleTheme onClick={toggleTheme}>
              {theme.palette.mode === 'dark' ? (
                <MuiIcons.Brightness7 fontSize="medium" />
              ) : (
                <MuiIcons.Brightness4 fontSize="medium" />
              )}
            </ToogleTheme>
          )}
          {isAuthenticated ? <UserMenu /> : <SignInButton />}
        </Actions>
      </Container>
    </Wrapper>
  )
}
