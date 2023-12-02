"use client"
import React from 'react'
import "./Estilos.css"
import Boton from 'next/image';
import Logo from 'next/image';
import Ayuda from 'next/image';
import ayuda from "@/../public/assets/ayuda.png"
import logo from "@/../public/assets/logowe.png"
import boton1 from "@/../public/assets/boton1.png"
import boton2 from "@/../public/assets/boton2.png"
import boton3 from "@/../public/assets/boton3.png"

import Link from 'next/link'
import next from 'next';
function Navbarinicio() {

  return (
    <div className='contenedor_navbar'>
      <div className='contenedor_imagenes_iconos_barra'>
      <div className='contenedor_botones_logo_busqueda'>
    
      <button className='botonnav'><Ayuda src={ayuda} className='boton1' alt='ayuda'/></button>
      </div>
      </div>
      
      <div className='contenedor_imagenes_iconos_barra'>
        <Link href="/logeado/inicio">
        <div className='contenedor_botones_logo_busqueda'>
              <Logo src={logo} className='logo' alt='logo'/>
        </div>
        </Link>
      </div>
      
   
      <div className='contenedor_imagenes_iconos_barra'>
        <div className='contenedor_botones_logo_busqueda'>
      <Link href="/logeado/subir">
       <button className='botonnav'><Boton src={boton1} className='boton1' alt='agregar pintura'/></button>
      </Link>


    <Link href="/logeado/randoms">
      <button className='botonnav'><Boton src={boton2} className='boton1' alt='aleatorio'/></button>
    </Link>
      


      <Link href="/logeado/user">
        <button className='botonnav'><Boton src={boton3} className='boton1' alt='mi perfil'/></button>
      </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbarinicio;