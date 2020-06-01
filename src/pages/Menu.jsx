import React from 'react'
import { observer } from 'mobx-react'
import store from 'App/store'

import ProductList from 'App/components/ProductList'
import Loader from 'App/components/UI/Loader'

@observer
class Menu extends React.Component {
  render(){
    const { categories, loadingCategories } = store;

    return  (
      <div className="page-cart mb-4">
        <Loader loading={loadingCategories} />
        {
          categories.map(category => (
            <div key={category.id}>
              <h1 className="text-center">{category.title}</h1>
              <ProductList categoryId={category.id} />
            </div>
          ))
        }
        {
          categories.length == 0 && !loadingCategories && <h2>Our server is down right now, and we can't load anything. Please, contact administrator.</h2>
        }
      </div>
    )
  }
}
export default Menu