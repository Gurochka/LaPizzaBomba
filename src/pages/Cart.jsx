import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'

import { observer } from 'mobx-react'
import store from 'App/store'
import { observable, action } from 'mobx'

import CartList from 'App/components/CartList'
import CheckoutForm from 'App/components/CheckoutForm'
import Loader from 'App/components/UI/Loader'

@observer
class Cart extends React.Component {
  @observable step = 'cart' // 'cart' | 'checkout' | 'order'

  @action changeStep(step){
    this.step = step
  }

  handleSubmitForm = (user_data) => {
    store.createOrder(user_data);
    this.step = 'order';
  }

  render(){
    const { cart, order, creatingOrder } = store;

    return  (
      <div className="container page-cart">
        {
          this.step == 'cart' && (
            <>
              <h1 className="text-center">Your cart </h1>
              <CartList />
              { cart.length > 0 && (
                <div className="text-center mt-5">
                  <button className="btn btn-primary" onClick={() => this.changeStep('checkout')}>
                    Proceed to checkout
                  </button>
                </div>
                )
              }
            </>
          )
        }
        {
          this.step == 'checkout' && (
            <>
              <h1 className="text-center with-return-btn">
                <div className="return-btn" onClick={() => this.changeStep('cart')}>
                  <SVG src="/public/images/back-icon.svg" />
                  <span>Return to cart</span>
                </div>
                Checkout
              </h1>
              <CheckoutForm onSubmit={this.handleSubmitForm} />
            </>
          )
        }
        {
          this.step == 'order' && order.id && creatingOrder && (
            <>
              <Loader loading={creatingOrder} />
              <h1>Creating an order</h1>
            </>
          )
        }
        {
          this.step == 'order' && order.id && !creatingOrder && (
            <>
              <h4 className="text-center">Your order #{order.id} was successfully created </h4>
              <p className="text-center">We have already started preparing your order. <br/> Our manager will contact you soon to confirm details</p>
            </>
          )
        }
      </div>
    )
  }
}
export default Cart