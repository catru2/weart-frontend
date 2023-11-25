import React from 'react'
import "./Estilos.css"

import Card from './Card'

function FormsInicio() {
  return (
    <div className='contenedor_cartas'>
      <div>
      <Card/>
      <Card/> 
      </div>
      <div>
      <Card/>
      <Card/>
      </div>
    </div>

  )
}

export default FormsInicio