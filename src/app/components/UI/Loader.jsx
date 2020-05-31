import React from 'react'
import SpinnerIcon from './icons/Spinner.jsx'

export default function Loader(props){
  if (props.loading && props.loading === true){
    return (
      <div className="loader-blocker">
        <div className="loader"> 
          <SpinnerIcon />
        </div>
      </div>
    )
  }
  return null
}