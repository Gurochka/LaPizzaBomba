import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import Menu from 'App/pages/Menu'
import Cart from 'App/pages/Cart'
import Header from 'App/components/Header'
import Footer from 'App/components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <div className="flex-grow-1 layout-wrapper pb-5 relative">
        <Route path="/" exact component={Menu} />
        <Route path="/cart" component={Cart} />
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App;