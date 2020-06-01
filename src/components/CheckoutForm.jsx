import React from 'react'

import store from 'App/store'
import { observer } from 'mobx-react'
import { observable, action, toJS, computed } from 'mobx'

import InputPhone from 'App/components/UI/InputPhone'

@observer
export default class CheckoutForm extends React.Component {
  @observable submitted = false
  @observable user = {
    name: '',
    phone: '',

    city: '',
    street: '',
    house: '',
    number: '',
    comment: ''
  }

  @computed get formValid(){
    return this.user.phone.length == 16 && this.user.city && this.user.street && this.user.house
  }

  @action handleChange(key, e){
    if (key == 'phone' ){
      this.user.phone = e;
      return
    }
    if (key == 'house' && e.target.value){
      const isNumberPattern = RegExp("^\\d+/?\\d*[a-zA-Z]?(?<!/)$").test(e.target.value);
      if (!isNumberPattern) return
    }
    if (key == 'number'){
      const isNumberPattern = RegExp('^[0-9]{0,5}$').test(e.target.value);
      if (!isNumberPattern) return;
    }
    this.user[key] = e.target.value;
  }

  handleConfirmOrder = () => {
    this.submitted = true;
    if (this.formValid) {
      this.props.onSubmit(toJS(this.user));
    }
  }

  render(){
    return (
      <form className={`checkout-form ${this.submitted ? 'submitted' : ''}`}>
        <input className="form-control mb-3" type="text" placeholder="Your Name" name="name"
          value={this.user.name} 
          onChange={(e) => this.handleChange('name', e)}
        />
        <div className="mb-2">
          <InputPhone className="form-control"  type="text" placeholder="Phone number *" name="phone" required 
            value={this.user.phone}
            onChange={(e) => this.handleChange('phone', e)} 
          />
          { !this.user.phone && <div className="form-field-error">Phone number is required.</div> }
          { this.user.phone && this.user.phone.length < 16 && <div className="form-field-error">Wrong phone number.</div> }
        </div>
        
        <div className="text-center mb-2">Address information:</div>
        
        <div className="mb-2">
          <input className="form-control" type="text" placeholder="City/Town *" name="city" required
            value={this.user.city}
            onChange={(e) => this.handleChange('city', e) } 
          />
          { !this.user.city && <div className="form-field-error">City is required.</div> }
        </div>

        <div className="mb-2">
          <input className="form-control" type="text" placeholder="Street *" name="street" required
            value={this.user.street}
            readOnly={!this.user.city} 
            onChange={(e) => this.handleChange('street', e) } 
          />
          { !this.user.street && <div className="form-field-error">Street is required.</div> }
        </div>
        
        <div className="d-flex">
          <div className="w-50 mb-2">
            <input className="form-control mr-2" type="text" placeholder="House number *" name="house" required
              value={this.user.house}
              readOnly={!this.user.street}  
              onChange={(e) => this.handleChange('house', e) } 
            />
            { !this.user.house && <div className="form-field-error">House number is required.</div> }
          </div>
          <div className="w-50 mb-2">
            <input className="form-control ml-2" type="text" placeholder="Appartment number" name="number"
              value={this.user.number}
              readOnly={!this.user.house}  
              onChange={(e) => this.handleChange('number', e) }
            />
          </div>
        </div>
        <textarea className="form-control mb-3" placeholder="Comment to the order" name="comment"
          value={this.user.comment}
          onChange={(e) => this.handleChange('comment', e) } 
        ></textarea>
        <button type="button" className="btn btn-primary" onClick={this.handleConfirmOrder}>
          Confirm order
        </button>
      </form>
    )
  }

}