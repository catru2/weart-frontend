import React from 'react'
import "./Estilos.css"
import "./Fuente.css"
import FormsRegistrarse from './FormsRegistrarse'
function BodyRegistrarse() {
  return (
    <div className='figura_fondoregistro'>
        <div className='titulos_login'>
        <p className='titulo_login'>WeArt</p>
         <p className='sub_login'>Registro</p>
        </div>
        <FormsRegistrarse/>
    </div>
  )
}

export default BodyRegistrarse