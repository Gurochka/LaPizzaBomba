import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from 'App/pages/Menu'
import Cart from 'App/pages/Cart'
import Header from 'App/components/Header'
import Footer from 'App/components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <div className="flex-grow-1">
        <Route path="/" exact component={Menu} />
        <Route path="/cart" component={Cart} />
      </div>
      <Footer />
    </Router>
  )
}

export default App;