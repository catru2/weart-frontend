"use client"
import React from "react";
import "./Estilos.css";
import Cardsubir from "./Cardsubir";
import Formslabelinput from "./Formslabelinput";
import Buttomsubir from "./Buttomsubir";
import Buttomcancelar from "./Buttomcancelar";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function FormsSubir() {
  const router = useRouter();
  const [pintura, setPintura] = useState({
    titulo: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    setPintura({
      ...pintura,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!imagen || !pintura.titulo || !pintura.descripcion){
      alert("LLene todos los campos")
    }else{
      const formData = new FormData();
    formData.append("titulo", pintura.titulo);
    formData.append("descripcion", pintura.descripcion);
    formData.append("imagen", imagen);
      await axios.post("http://localhost:80/pinturas",formData,{withCredentials:true})
    alert("Pintura subida")
      router.replace("/logeado/inicio")
    }
    
  };
  return (
    <div >
      <form onSubmit={handleSubmit} className="contendor_carta_subir">
        <Cardsubir fun={setImagen} imagen={imagen}/>

        <div className="contenedor_caracteristicas_subir">
          <div className="mover">
            <div className="contenedor_input_subir">
              <Formslabelinput titulo="Título" tipo="titulo" fun={handleChange}/>
              <Formslabelinput titulo="Descripción" tipo="descripcion" fun={handleChange}/>
            </div>
            <div className="contendor_botones_subir">
              <Buttomsubir tipo="Subir" tipooo="submit"/>
              <Buttomcancelar tipo="Cancelar" tipooo="delete" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormsSubir;
