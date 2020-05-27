import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from 'App/pages/Menu'
import Cart from 'App/pages/Cart'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Menu} />
      <Route path="/cart" component={Cart} />
    </Router>
  )
}

export default App;