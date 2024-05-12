import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#020617',
      default: '#0f172a'
    },
    primary: {
      main: '#4438ca',
      light: '#4e46e5',
      dark: '#3830a3'
    },
    secondary: {
      main: '#5a21b6',
      light: '#6c28d9',
      dark: '#2e1065'
    },
    divider: '#1e293b',
  }
})
