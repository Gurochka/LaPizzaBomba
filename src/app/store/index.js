import { action, observable, computed } from 'mobx';

class Store {
  constructor(){
    this.getCart()
    this.getGoods()
    this.getCategories()
  }
  
  pizzaSizes = [
    { id: 'm', title: 'regular', diameter: '25' },
    { id: 'l', title: 'large', diameter: '30' }
  ]

  @observable categories = []
  
  @observable goods = []

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

  isPizza = (good) => good.categoryId == 1
  isDrink = (good) => good.categoryId == 2

  /* ------------------- cart ------------------ */

  @observable cart = []

  @action getCart(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]')
  }

  @action addToCart(good, size){
    let goodInCart = this.cart.find(item => item.good_id == good.id);

    if (goodInCart){
      goodInCart.quantity++;
    } else {
      this.cart.push({
        size: size.id,
        good_id: good.id,
        quantity: 1
      })
      this.saveCartInLocalStore();
    }
  }

  @action removeFromCart(good_id){
    const goodIdx = this.cart.findIndex(item => item.good_id == good_id);
  
    if (goodIdx != -1){
      let cartItem = this.cart[goodIdx];
      if (cartItem.quantity == 1) this.cart.splice(goodIdx, 1)
        else cartItem.quantity--;
      this.saveCartInLocalStore();
    }
  }

  @computed get quantity(){
    return this.cart.reduce((acc, item) => { return acc + item.quantity}, 0);
  }

  saveCartInLocalStore(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }  
}

export default new Store()