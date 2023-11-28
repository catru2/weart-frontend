"use client"
import React from 'react'
import Labellogin from './Labellogin'
import Inputlogin from './Inputlogin'
import Buttomlogin from './Buttomlogin'
import Buttomlogindife from './Buttomlogindife'
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"

function Formslogin() {
  const [usuario , setUsuario] = useState({
    correo:"",
    password:""
  })
  const navigation=useRouter()

  const handleChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }


  const handleSubmit = async (e) =>{
    e.preventDefault()
   if(!usuario.correo || !usuario.password){
     alert("Por favor llene todos los campos")
  }else{
    const res= await axios.post("http://localhost:80/auth/signin",usuario,{withCredentials:true})
   if(res.data?.token){
    alert("datos correctos")
    navigation.replace("/logeado/inicio")
   }else{
    alert("datos incorrectos")
   }
  }
}
  return (
    <div className='contenedor_forms'>
      <form onSubmit={handleSubmit}>
      <Labellogin titulo="Correo:"/>
        <Inputlogin tipo="email" holder="Martin@gmail.com" name="correo" fun={handleChange}/>
        <Labellogin titulo="Contraseña:"/>
        <Inputlogin tipo="password" name="password" fun={handleChange}/>
        <div className='contenedor_botoneslogin'>
        <Link href="/registrarse">
        <Buttomlogindife tipo="Registrarse"/>
        </Link>
        <Buttomlogin tipo="Entrar"/>
        </div>
      </form>
    </div>
  )
}

export default Formslogin