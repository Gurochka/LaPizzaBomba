import React from 'react'
import { Link } from 'react-router-dom'

import { observer } from 'mobx-react'
import store from 'App/store'

import CartItem from 'App/components/CartItem'
import Loader from 'App/components/UI/Loader'

@observer
class Cart extends React.Component {

  render(){
    const { cart, goods, loadingGoods } = store;
    const total = store.getTotalPrice;

    return  (
      <div className="container page-cart">
        <h1 className="text-center">Your cart </h1>
        <ul className="cart-list">
          <Loader loading={loadingGoods} />
          {
            goods.length > 0 && cart.map(item => (
              <CartItem key={item.size ? (item.good_id + item.size) : item.good_id} item={item} />
            ))
          }
          {
            goods.length == 0 && !loadingGoods && <div> Coundl't display cart without goods =( </div>
          }
          {
            cart.length > 0 && (
              <li className="cart-item cart-item-total">
                <h4 className="ml-4">Order amount:</h4>
                <div className="price">{total} $</div>
              </li>
            )
          }
          {
            cart.length == 0 && (
              <li className="cart-item">
                <h4 className="text-center w-100">
                  You haven't added anything to your shopping cart yet. 
                  <br/>
                  Check out our <Link to="/">Menu</Link>
                </h4>
              </li>
            )
          }

        </ul>
        <button className="btn btn-primary">Proceed to checkout</button>

      </div>
    )
  }
}
export default Cart