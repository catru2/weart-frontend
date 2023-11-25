import React from 'react'

function InputInicio(props) {
  return (
    <input type={props.tipo} className='input_inicio_barrabusqueda' placeholder='Buscar' />
  )
}

export default InputInicio