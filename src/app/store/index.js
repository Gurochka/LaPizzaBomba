import { action, observable, computed } from 'mobx';

class Store {
  constructor(){
    this.getCart()
    this.getGoods()
    this.getCategories()
  }
  
  pizzaSizes = [
    { id: 'm', title: 'regular' },
    { id: 'l', title: 'large' } 
  ]

  @observable categories = []
  
  @observable goods = []

  @observable cart = []

  @action getCategories(){
    return fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(categories => {
        this.categories = categories
        return categories
      })
  }

  @action getGoods(){
    return fetch('http://localhost:3000/goods')
      .then(res => res.json())
      .then(res => {
        this.goods = res
        return res
      })
  }

  @action getCart(){

  }

  @action addToCart(good){

  }

  @action removeFromCart(good_id){

  }
}

export default new Store()