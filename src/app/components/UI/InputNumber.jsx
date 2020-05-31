import React from 'react'
import MinusIcon from 'App/components/UI/icons/MinusIcon'
import PlusIcon from 'App/components/UI/icons/PlusIcon' 

class InputNumber extends React.Component {
  onChangeAmount(diff){
    let new_value = (this.props.value + diff) || parseInt(this.props.diff || 0, 10)
    this.props.onChange(new_value);
  }

  onInputHandler = (e) => {
    let isNumberPattern = RegExp('^[0-9]{0,3}$').test(e.target.value);

    if (isNumberPattern){
      this.onChangeAmount(e.target.value - this.props.value)
    }
  }

  render(){
    const diff = parseInt(this.props.diff || 1, 10)
    return  (
      <div className="input-number d-flex">
        <div onClick={() => this.onChangeAmount(-diff)}>
          <MinusIcon />
        </div>
        <input value={this.props.value} onChange={this.onInputHandler} type="text" className="form-control"/>
        <div onClick={() => this.onChangeAmount(diff)}>
          <PlusIcon />
        </div>
      </div>
    )
  }
}
export default InputNumber