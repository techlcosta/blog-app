import { type ReactElement } from 'react'
import { NavItem } from './navItem'

export function Menu(): ReactElement {
  return (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/forex">Forex</NavItem>
      <NavItem to="/stocks">Stocks</NavItem>
      <NavItem to="/cryptocurrency">Cryptocurrencies</NavItem>
    </>
  )
}
