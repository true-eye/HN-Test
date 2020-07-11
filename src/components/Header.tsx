import React from 'react'
import './Header.css'

interface Props {
  title: string
}

const Header = ({ title }: Props) => (
  <header>
    <h1>{title}</h1>
  </header>
)

export default Header
