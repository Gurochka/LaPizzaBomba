import React, { useState } from 'react'

export default function Toggler(props) {
  const { values } = props;
  
  const [active, setActive] = useState(values[0].id);
  const activeIdx = values.findIndex(val => val.id == active);

  const onHandleClick = (val) => {
    if (val.id == active) return;
    setActive(val.id);
  }

  const styles = {
    transform: `translateX(${activeIdx*100}%)`,
    width: `${100/values.length}%`
  }

  return  (
    <div className="toggler">
      <div className="toggler-checked" style={styles} />
      {
        values.map(val => (
          <div key={val.id} className="toggler-radio" onClick={() => onHandleClick(val)}>
            {val.title}
          </div>
        ))
      }
    </div>
  )
}
