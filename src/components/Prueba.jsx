"use client"
import "./Estilos.css"
import Card from './Card'
import { useEffect,useState } from "react"
import axios from "axios"
function Prueba() {
    const [pinturas,setPinturas] = useState([])
  const uploadPinturas = async() => {
    const data = await axios.get("http://localhost:80/pinturas/random/get")
    setPinturas(data.data.data)
  }
  useEffect(()=>{
        uploadPinturas()
  },[])
  
  return (
    <div className='contenedor_cartas'>
        <div className="cartas">
        {
            pinturas.map((pintura,index)=>(
              <div key={index}>
                <Card imagen={pintura.imagen} titulo={pintura.titulo} descripcion={pintura.descripcion} idUsuario={pintura.id_usuario} idPintura={pintura.id_pintura} pintura={pintura}/>
              </div>
            ))
        }
        </div>
    </div>
  )
}

export default Prueba