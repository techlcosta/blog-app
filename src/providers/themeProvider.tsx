import { ThemeContext } from '@/contexts/themeContext'
import { GlobalStyle } from '@/styles/global'
import { darkTheme } from '@/themes/dark'
import { lightTheme } from '@/themes/light'
import * as Mui from '@mui/material'
import { useMemo, useState, type ReactElement, type ReactNode } from 'react'

type ThemeType = 'light' | 'dark'

interface ThemeProviderProps {
  children: ReactNode
}

function getTheme(): ThemeType {
  const item = localStorage.getItem('dx_theme')

  if (item != null && typeof item === 'string') return item as ThemeType

  return 'light'
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const [mode, setMode] = useState<ThemeType>(getTheme())

  function toggleTheme(): void {
    setMode((prevMode) => {
      if (prevMode === 'light') {
        localStorage.setItem('dx_theme', 'dark')
        return 'dark'
      }
      localStorage.setItem('dx_theme', 'light')
      return 'light'
    })
  }

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Mui.ThemeProvider theme={theme}>
        <Mui.CssBaseline />
        <GlobalStyle />
        {children}
      </Mui.ThemeProvider>
    </ThemeContext.Provider>
  )
}
