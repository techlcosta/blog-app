import * as Mui from '@mui/material'
import { styled } from '@mui/material/styles'

export const TextField = styled(Mui.TextField)`
  .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`


