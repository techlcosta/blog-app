import { Header } from '@/components/header'
import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Container = styled('div')`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled('main')`
  height: 100%;
  padding-top: 6rem;
`

export function Layout(): ReactElement {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  )
}
