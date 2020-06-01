import { action, observable, computed, toJS, runInAction } from 'mobx';
import { toast } from 'react-toastify'

//production
let host = 'https://la-pizza-bomba-server.herokuapp.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //development
  host = 'http://localhost:3000';
}

class Store {
  constructor(){
    this.getCart()
    this.getGoods()
    this.getCategories()
  }

  fetchUrl(url){
    return fetch(host + url)
      .then(res => {
        if (res.ok) return res.json();
        return { error: res.status + ' ' + res.statusText }
      })
      .catch(error => { this.showFetchError(`Error: ${error}`) })
  }

  fetchPostUrl(url, data){
    return fetch(host + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)     
    })
      .then(res => {
        if (res.ok) return res.json();
        return { error: res.status + ' ' + res.statusText }
      })
      .catch(error => { this.showFetchError(`Error: ${error}`) })    
  }

  /* ------------------- Order ---------------------- */ 
  @observable order = {}
  @observable creatingOrder = false

  @action createOrder(user_data){
    this.creatingOrder = true

    this.fetchPostUrl('/orders', user_data)
      .then(res => {
        runInAction(() => {
          this.creatingOrder = false

          if (res.error){
            this.showFetchError(`Couldn't create order. Error: ${res.error}`);
          } else {
            this.order = res;
            this.cart = [];
            this.saveCartInLocalStore();
          }
        })
      })
  }

  /* ------------------- UI ---------------------- */

  @observable loadingGoods = false
  @observable loadingCategories = false

  showFetchError = (message) => {
    toast(message, {
      type: 'error'
    });
  }

  /* ------------------ categories ------------------ */

  @observable categories = []

  @action getCategories(){
    this.loadingCategories = true;

    return this.fetchUrl('/categories')
      .then(res => {
        runInAction(() => {
          this.loadingCategories = false
          
          if (res.error){
            this.showFetchError(`Couldn't load categories of goods. Error: ${res.error}`);
          } else {
            this.categories = res
          }
        })
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
    this.loadingGoods = true;

    this.fetchUrl('/goods')
      .then(res => {
        runInAction(() => {
          this.loadingGoods = false

          if (res.error) {
            this.showFetchError(`Couldn't load goods. Error: ${res.error}`);
          } else {
            this.goods = res
          }
        })
      })
  }

  getPrice = (good, size_id) => {
    return this.isPizza(good) ? good.price[this.getPizzaSizeIdx(size_id) || 0] : good.price
  }

  getWeight = (good, side_id) => {
    let weight = this.isPizza(good) ? good.weight[this.getPizzaSizeIdx(side_id) || 0] : good.weight;
    return weight ? (weight + (this.isDrink(good) ? ' l' : ' gr')) : ''
  }

  getGood = (good_id) => this.goods.find(good => good.id == good_id)

  isPizza = (good) => good.categoryId == 1
  isDrink = (good) => good.categoryId == 2

  /* ------------------- cart ------------------ */

  @observable cart = []
  deliveryCost = 5

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
      const price = this.getPrice(good, item.size);
      return acc + item.quantity*price;
    }, 0)
  }

  @computed get totalWithDelivery(){
    const total = this.getTotalPrice;
    return total >=10 ? total : (total + this.deliveryCost);
  }

  usdToEuro = price => Math.round(price*1.11*100)/100

  saveCartInLocalStore(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }  
}

export default new Store()