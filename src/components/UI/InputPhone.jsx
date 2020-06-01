import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

@observer
export default class InputPhone extends Component {
  @observable value = ''

  onFocus = (e) => {
    if (!this.value) this.value = '+7(';
  }

  handleOnChange = (e) => {
    let val = e.target.value,
      len = val.length;

    if (!val) val = '+7(';

    if (this.value && this.value.length < len){ // если цифры вводятся
      if (len == 6) val += ')'
      if (len == 10 || len == 13) val += '-'
    }
    if (this.value && this.value.length > len && // если цифры удаляются
      (len == 13 || len == 10 || len == 6)){
        val = val.slice(0, -1);
    }

    let regexp = new RegExp(
      '^\\+7\\(' +
      '[0-9]{0,3}((?<=.{6})\\))?' +
      '[0-9]{0,3}((?<=.{10})-)?' +
      '[0-9]{0,2}((?<=.{13})-)?' +
      '[0-9]{0,2}$'
    )

    if (regexp.test(val)){
      this.value = val;
      if (this.props.onChange) this.props.onChange(val)
    }
  }

  render() {
    return (
      <input {...this.props} onChange={this.handleOnChange} value={this.value} onFocus={this.onFocus}/>
    );
  }
}