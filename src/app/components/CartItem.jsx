import React, { useState } from 'react'
import { computed, toJS } from 'mobx'
import { observer } from 'mobx-react'
import store from 'App/store'

import InputNumber from 'App/components/UI/InputNumber'
import SVG from 'react-inlinesvg'

@observer
export default class Product extends React.Component {
  handleRemoveGood = () => {
    store.removeFromCart(this.props.item.good_id, this.props.item.quantity)
  }

  itemQuantityChanged = (val) => {
    const { item } = this.props;
    if (val < item.quantity){
      store.removeFromCart(item.good_id, 1)
    }  else {
      const good = store.goods.find(good => good.id == item.good_id);
      const size = store.getPizzaSize(item.size);
      store.addToCart(good, size);
    }
  }

  render(){
    const { item } = this.props;
    const good = store.goods.find(good => good.id == item.good_id);
    const size = store.getPizzaSize(item.size);
    const weight = store.getWeight(good, item.size);

    const isPizza = store.isPizza(good);

    return  (
      <li className="cart-item d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img src={good.image_url} />
          <div className="ml-4">
            <h4 className="ml-0">{good.title}</h4>
            <p className="text-gray-500">
            { isPizza && (size.id == 'm' ? 'Regular, ' : 'Large, ') }
            { weight && weight }
            </p>
          </div>
        </div>
        <div className="d-flex">
          <InputNumber value={item.quantity} onChange={this.itemQuantityChanged}/>
          <div className="price">
            <b>{store.getPrice(good, size.id) * item.quantity} $</b>
            <SVG src="/src/public/images/trash-icon.svg" onClick={this.handleRemoveGood} />
          </div>
        </div>
      </li>
    )
  }
}