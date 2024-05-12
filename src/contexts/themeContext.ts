import { type Theme } from '@mui/material'
import { createContext } from 'react'

interface IThemeContext {
  theme: Theme | undefined
  toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext>({
  theme: undefined,
  toggleTheme: () => {}
})
