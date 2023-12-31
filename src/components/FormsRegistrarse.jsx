"use client"

import React from 'react'
import Labellogin from './Labellogin'
import Inputlogin from './Inputlogin'
import Link from 'next/link'
import Buttomlogindife from './Buttomlogindife'
import { useState } from "react";
import axios from "axios"
import { useRouter } from 'next/navigation'
function FormsRegistrarse() {
  const [usuario , setUsuario] = useState({
    nombre:"",
    correo:"",
    password:"",
    fecha_nacimiento: ""
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
    
    if(!usuario.nombre || !usuario.correo || !usuario.password || !usuario.fecha_nacimiento){
      alert("Por favor llene todos los campos")
    }else{
      const res = await axios.post("http://34.225.204.31/usuarios",usuario)
      console.log(res)
      if(res.data.succesn){
        alert("se registro exitosamente")
        navigation.replace("/login")
      }else{
        alert("no se pudo registrar")
      }
    }
  }


  return (
    <div className='contenedor_forms_crearcuen'>
        <form onSubmit={handleSubmit}>
        <Labellogin titulo="Correo:"/>
        <Inputlogin tipo="email" name="correo" fun={handleChange}/>
        <Labellogin titulo="Usuario:"/>
        <Inputlogin tipo="user" name="nombre" fun={handleChange}/>
        <Labellogin titulo="Contraseña:"/>
        <Inputlogin tipo="password" name="password" fun={handleChange}/>
        <Labellogin titulo="Fecha de nacimiento:"/>
        <Inputlogin tipo="date" name="fecha_nacimiento" fun={handleChange}/>
        <div className='contenedor_botoncrear'>
        <Buttomlogindife tipo="Registrarse"/>
       
         </div>
          
        </form>
       
    </div>
  )
}

export default FormsRegistrarse