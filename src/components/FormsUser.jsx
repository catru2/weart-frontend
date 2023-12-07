"use client"
import React from 'react'
import "./Estilos.css"
import Card from './Card'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
function FormsUser(props) {
  const params = useParams();
  const [pinturas, setPinturas] = useState([])
  const uploadPinturas = async () => {
    let res = null
    if(params.id){
      res = await axios.get(`http://34.225.204.31/pinturas/usuario/${params.id}`, {withCredentials: true});
    setPinturas(res.data.data)
    }else{
      res = await axios.get(`http://34.225.204.31/pinturas/usuario/${props.idUsuario}`, {withCredentials: true});
    setPinturas(res.data.data)
    }
  }
  useEffect(()=>{
    uploadPinturas();
  },[])
  return (
    <div className='contenedor_cartas'>
        <div className="cartas">
        {pinturas.map((pintura,index)=>(
          <div key={index}>
            <Card imagen={pintura.imagen} titulo={pintura.titulo} descripcion={pintura.descripcion} idUsuario={pintura.id_usuario} idPintura={pintura.id_pintura} usuarioCurrent={props.idUsuario} />
          </div>
        ))}
        </div>
    </div>
  )
}

export default FormsUser;