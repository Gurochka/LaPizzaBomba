import React, { useState } from 'react'

export default function Toggler(props) {
  const { values, selected, onSelect } = props;

  let selectedValue = selected || values[0]
  const selectedIdx = values.findIndex(val => val.id == selectedValue.id);
  
  const styles = {
    transform: `translateX(${selectedIdx*100}%)`,
    width: `${100/values.length}%`
  }

  return  (
    <div className="toggler">
      <div className="toggler-checked" style={styles} />
      {
        values.map(val => (
          <div key={val.id} className="toggler-radio" onClick={() => onSelect(val)}>
            {val.title}
          </div>
        ))
      }
    </div>
  )
}
