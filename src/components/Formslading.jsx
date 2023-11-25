"use client"
import React from 'react'
import Link from 'next/link'
import Buttomlading from './Buttomlading'
import { useRouter } from 'next/navigation'

function Formslading() {
  
  return (
   <div>
     <Link href="login"> 
    <div className='contenedor_boton_lading'> 
    <Buttomlading tipo="Entrar" /> 
    </div>
    </Link>
   </div>
    
  )
}

export default Formslading