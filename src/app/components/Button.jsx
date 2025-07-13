import React, { Children } from 'react'

const Button = ({className, onClick, name }) => {
  return (
    <button className={className} onClick={onClick}>
        {name}
    </button>
  )
}

export default Button