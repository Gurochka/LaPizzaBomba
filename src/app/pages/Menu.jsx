import React from 'react'
import { observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import store from 'App/store'

import Product from 'App/components/Product'

@observer
class Menu extends React.Component {
  
  componentDidMount(){
    store.getCategories();
    store.getGoods();
  }

  addToCart = (product) => {
    console.log('add to cart', product);
  }

  filteredItems = (category_id) => store.goods.filter(good => good.categoryId == category_id);

  render(){
    const { categories, goods } = store;

    return  (
      <div className="page-cart">
        {
          categories.map(category => (
            <div key={category.id}>
              <h1 className="text-center">{category.title}</h1>
              <div className="container product-list">
                {
                  this.filteredItems(category.id).map(item => (
                    <Product 
                      item={item} 
                      key={item.id} 
                    /> 
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
export default Menu