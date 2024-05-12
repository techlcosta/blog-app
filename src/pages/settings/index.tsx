import { styled } from '@mui/material/styles'
import { type ReactElement } from 'react'

const Container = styled('div')`
  padding: 2rem;
`

export function Settings(): ReactElement {
  return (
    <Container>
      <h1>Settings</h1>

    </Container>
  )
}
