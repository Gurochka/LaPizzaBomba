import React from 'react'

import { observer, computed } from 'mobx-react'
import store from 'App/store'

import CartItem from 'App/components/CartItem'

@observer
class Cart extends React.Component {

  render(){
    const { cart, goods } = store;
    const total = store.getTotalPrice;

    return  (
      <div className="container page-cart">
        <h1 className="text-center">Your cart </h1>
        <ul className="cart-list">
        {
          goods.length && cart.map(item => (
            <CartItem key={item.size ? (item.good_id + item.size) : item.good_id} item={item} />
          ))
        }
          <li className="cart-item cart-item-total">
            <h4 className="ml-4">Order amount:</h4>
            <div className="price">{total} $</div>
          </li>
        </ul>
        <button className="btn btn-primary">Proceed to checkout</button>

      </div>
    )
  }
}
export default Cart