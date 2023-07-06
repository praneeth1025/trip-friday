import React from 'react'
import './Button.css'


function Button({handleButton,text ,className }) {

  return (
    <div className='button-container'>
        <button className={`button-background ${className}`} onClick ={handleButton}>{text}</button>
    </div>
  )
}

export default Button
