import { GlobalStyles } from '@mui/material'
import { type ReactElement } from 'react'

export function GlobalStyle(): ReactElement {
  return (
    <GlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        button: {
          cursor: 'pointer'
        },
        '[disabled]': {
          opacity: 0.6,
          cursor: 'not-allowed'
        }
      }}
    />
  )
}
