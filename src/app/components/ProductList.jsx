import React, { useState } from 'react'
import store from 'App/store'
import { observer } from 'mobx-react'

import Product from 'App/components/Product'
import Loader from 'App/components/UI/Loader'

@observer
export default class ProductList extends React.Component {
  addToCart = (product, size) => {
    store.addToCart(product, size);
  }

  render(){
    const { loadingGoods } = store;
    const goods = store.goods.filter(good => good.categoryId == this.props.categoryId);

    return (
      <div className="container relative">
        <Loader loading={loadingGoods} />
        { goods.length == 0 && <div className="text-center my-2"> There are no goods found. </div> }
        <div className="product-list">
        {
          goods.map(item => (
            <Product
              item={item} 
              key={item.id}
              addToCart={this.addToCart}
            />
          ))
        }
        </div>
      </div>
    )
  }
}