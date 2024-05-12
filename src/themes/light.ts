import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#f1f5f9',
      default: '#f8fafc'
    },
    primary: {
      main: '#4438ca',
      light: '#4e46e5',
      dark: '#3830a3'
    },
    secondary: {
      main:"#5a21b6",
      light:"#6c28d9",
      dark:"#2e1065"
    }
  }
})
