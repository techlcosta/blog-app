import * as Mui from '@mui/material'
import { type ReactElement, type ReactNode } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

interface SelectProps<T extends FieldValues, U extends Path<T>> {
  name: U
  id: string
  label: string
  labelId: string
  control: Control<T>
  children: ReactNode
}

export function Select<T extends FieldValues, U extends Path<T>>(
  props: SelectProps<T, U>
): ReactElement {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => (
        <Mui.FormControl fullWidth error={Boolean(error?.message)}>
          <Mui.InputLabel id={props.labelId}>{props.label}</Mui.InputLabel>
          <Mui.Select
            size="medium"
            id={props.id}
            label={props.label}
            labelId={props.labelId}
            {...field}
            sx={{
              background: (theme) => theme.palette.background.paper
            }}
            MenuProps={{
              sx: {
                '& .MuiPaper-root': {
                  marginTop: '0.5rem',
                  background: (theme) => theme.palette.background.paper
                }
              }
            }}
          >
            {props.children}
          </Mui.Select>
          <Mui.FormHelperText>{error?.message}</Mui.FormHelperText>
        </Mui.FormControl>
      )}
    />
  )
}
