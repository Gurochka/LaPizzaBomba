import React, { useState } from 'react'
import store from 'App/store'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Toggler from 'App/components/UI/Toggler'

@observer
export default class Product extends React.Component {
  @observable selected = store.pizzaSizes[0]

  handleSelectSize = (size) => {
    this.selected = size;
  }

  handleAddToCart = () => {
    this.buttonEl.classList.add('added');

    setTimeout(() => {
      if (this.buttonEl) this.buttonEl.classList.remove('added');
    }, 2350);
    this.props.addToCart(this.props.item, this.selected);
  }

  render(){
    const { item } = this.props;
    const { selected } = this;
    const isPizza = store.isPizza(item);

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
                <Toggler values={store.pizzaSizes} selected={selected} onSelect={size => { this.selected = size}} />
                <div className="product-weight"> {store.getWeight(item, selected.id)} , {selected.diameter} cm </div>
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
          <div className="d-flex justify-content-between py-2 align-items-center">
            <b> {store.getPrice(item, selected.id)} $</b>

            <button 
              className={`btn btn-primary btn-add-to-cart`} 
              onClick={this.handleAddToCart}
              ref={(el) => { this.buttonEl = el }}
            >
              <b>Add</b>
                <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                  <path strokeDasharray="19.79 19.79" strokeDashoffset="19.79" className="check" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"/>
                </svg>
            </button>

          </div>
        </div>
      </div>
    )
  }
}