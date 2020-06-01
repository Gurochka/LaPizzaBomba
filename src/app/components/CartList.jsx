import React from 'react'
import { Link } from 'react-router-dom'
import store from 'App/store'
import { observer } from 'mobx-react'

import CartItem from 'App/components/CartItem'
import Loader from 'App/components/UI/Loader'

@observer
export default class CartList extends React.Component {
  render(){
    const { cart, goods, loadingGoods } = store;
    const total = store.getTotalPrice;

    return  (
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
    )
  }  
}