import React from 'react'

import { observer } from 'mobx-react'
import store from 'App/store'

import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'

@observer
class Header extends React.Component{

  render(){
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
            <Link to="/cart" className="header-cart">
              <div className="badge">{store.quantity}</div>
              <SVG src="/src/public/images/shopping-basket-solid.svg" />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
export default Header