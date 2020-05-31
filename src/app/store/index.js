import { action, observable, computed, toJS } from 'mobx';

class Store {
  constructor(){
    this.getCart()
    this.getGoods()
    this.getCategories()
  }
  
  /* ------------------ categories ------------------ */

  @observable categories = []

  @action getCategories(){
    return fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(categories => {
        this.categories = categories
        return categories
      })
  }

  /* -------------------- goods ---------------------  */

  pizzaSizes = [
    { id: 'm', title: 'regular', diameter: '25' },
    { id: 'l', title: 'large', diameter: '30' }
  ]

  getPizzaSize = (size_id) => this.pizzaSizes.find(size => size.id == size_id)
  getPizzaSizeIdx = (size_id) => {
    const idx = this.pizzaSizes.findIndex(size => size.id == size_id);
    return idx == -1 ? undefined : idx;
  }

  @observable goods = []

  @action getGoods(){
    return fetch('http://localhost:3000/goods')
      .then(res => res.json())
      .then(res => {
        this.goods = res
        return res
      })
  }

  getPrice = (good, selected) => {
    return this.isPizza(good) ? good.price[this.getPizzaSizeIdx(selected.size) || 0] : good.price
  }

  getWeight = (good, selected) => {
    let weight = this.isPizza(good) ? good.weight[this.getPizzaSizeIdx(selected.size) || 0] : good.weight;
    return weight ? (weight + (this.isDrink(good) ? ' l' : ' gr')) : ''
  }

  getGood = (good_id) => this.goods.find(good => good.id == good_id)

  isPizza = (good) => good.categoryId == 1
  isDrink = (good) => good.categoryId == 2

  /* ------------------- cart ------------------ */

  @observable cart = []

  @action getCart(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]')
  }

  @action addToCart(good, size){
    let goodInCart = this.cart.find(item => {
      if (item.size) return item.good_id == good.id && item.size == size.id
        else return item.good_id == good.id
    });

    if (goodInCart){
      goodInCart.quantity++;
    } else {
      let cartItem = {
        good_id: good.id,
        quantity: 1       
      }
      if (this.isPizza(good)) cartItem.size = size.id;

      this.cart.push(cartItem);
      this.saveCartInLocalStore();
    }
  }

  @action removeFromCart(good_id, quantity = 1){
    const goodIdx = this.cart.findIndex(item => item.good_id == good_id);
  
    if (goodIdx != -1){
      let cartItem = this.cart[goodIdx];

      let newQuantity = cartItem.quantity - quantity;
      if (newQuantity === 0) this.cart.splice(goodIdx, 1)
        else cartItem.quantity = newQuantity;
      this.saveCartInLocalStore();
    }
  }

  @computed get quantity(){
    return this.cart.reduce((acc, item) => { return acc + item.quantity}, 0);
  }

  @computed get getTotalPrice(){
    if (!this.goods.length) return 0;
    return this.cart.reduce((acc, item) => {
      const good = this.getGood(item.good_id);
      const price = this.getPrice(good, item);
      return acc + item.quantity*price;
    }, 0)
  }

  saveCartInLocalStore(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }  
}

export default new Store()