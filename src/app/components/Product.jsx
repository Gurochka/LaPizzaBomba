import React, { useState } from 'react'
import store from 'App/store'
import Toggler from 'App/components/UI/Toggler'

export default class Product extends React.Component {
  state = {
    selectedIdx: 0
  }

  handleSelectSize = (size) => {
    let selectedIdx = store.pizzaSizes.findIndex(val => val.id == size.id);
    this.setState({ selectedIdx: selectedIdx })
  }

  render(){
    const { item } = this.props;
    const { selectedIdx } = this.state;
    const isPizza = store.isPizza(item);
    const selected = store.pizzaSizes[selectedIdx]

    return  (
      <div className="product-card d-flex flex-column justify-content-between">
        <div className="d-flex flex-column align-items-center">
          <img src={item.image_url}/>
          <h4 className="mb-1">{item.title}</h4>
          {
            item.description && <div className="product-description">{item.description}</div>
          }
        </div>

        <div>
          {
            isPizza && (
              <>
                <Toggler values={store.pizzaSizes} selected={selected} onSelect={this.handleSelectSize} />
                <div className="product-weight"> {item.weight[selectedIdx]}gr, {selected.diameter} cm </div>
              </>
            )
          }
          {
            !isPizza && item.weight && (
              <div className="product-weight"> 
                { item.weight } { store.isDrink(item) ? 'l' : 'gr' }
              </div>
            )
          }
          <div className="d-flex justify-content-between py-2 align-content-center">
            <b>{ isPizza ? item.price[selectedIdx] : item.price } $</b>
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    )
  }
}
