import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'

export default function Header(props){
  return  (
    <nav className="menu">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="brand d-flex align-items-center">
            <SVG className="logo" src="/src/public/images/logo.svg" />
            <span>La Pizza Bomba!</span>
          </Link>
          <Link to="/">Menu</Link>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/cart"><SVG className="cart mr-5" src="/src/public/images/shopping-basket-solid.svg" /></Link>
        </div>
      </div>
    </nav>
  )
}