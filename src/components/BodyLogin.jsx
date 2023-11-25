import React from 'react'
import "./Estilos.css"
import "./Fuente.css"
import Formslogin from './Formslogin'

function BodyLogin() {
  return (
    <div className='figura_fondologi'>
        <div className='titulos_login'>
        <p className='titulo_login'>WeArt</p>
         <p className='sub_login'>Iniciar sesión</p>
        </div>
        
         <Formslogin/>
       
    </div>
  )
}

export default BodyLogin