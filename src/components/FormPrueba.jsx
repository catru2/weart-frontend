"use client"
import { useEffect,useState } from 'react'
import axios from 'axios'
import Card from './Card'
function FormPrueba() {
  const [pinturasRandom,setPinturasRandom] = useState([])
    
    
      useEffect(()=>{
        const uploadPinturasRandom = async () => {
            const data = await axios.get("http://localhost:80/pinturas/random/get")
            setPinturasRandom(data.data.data)
          }
        uploadPinturasRandom()
      },[])
  return (
    <div className='contenedor_cartas'>
        <div className='cartas'>
            {
                pinturasRandom.map((pintura,index)=>(
                <div key={index}>
                    <Card imagen={pintura.imagen} titulo={pintura.titulo} descripcion={pintura.descripcion} idUsuario={pintura.id_usuario} idPintura={pintura.id_pintura} pintura={pintura}/>
                </div>
                ))
            } 
        </div>
    </div>
  )
}

export default FormPrueba