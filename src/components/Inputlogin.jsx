import React from 'react'

function Inputlogin(props) {
  return (
    <input name={props.name}type={props.tipo} placeholder={props.holder} className='input_login' onChange={props.fun}/>
  )
}

export default Inputlogin