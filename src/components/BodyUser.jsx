"use client"
import React from "react";
import Img from "next/image";
import userimg from "@/../public/assets/boton3.png";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
function BodyUser(props) {
  const params = useParams();
  const [user, setUser] = useState({});
  const [des, setDes] = useState({
    descripcion: "",
  });
  const uploadUser = async () => {
    let res=null
    if(params.id){
      res = await axios.get(`http://localhost:80/usuarios/${params.id}`, {withCredentials: true});
    }else{
      res = await axios.get(`http://localhost:80/usuarios/${props.idUsuario}`, {withCredentials: true});
    }
    setUser(res.data.data);
  }
  const handleChange = async (e) =>{
    e.preventDefault();
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Ingresa una nueva descripcion",
      inputPlaceholder: "Escribe tu descricion aquí...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });
    // if (text) {
    //   Swal.fire(text);
    // }
    setDes({
      descripcion: text,
    });
  }
  
  const patchlol = async () => {
    console.log(des);
    if(props.idUsuario && des.descripcion){
      await axios.patch("http://localhost:80/usuarios",des,{withCredentials:true})
    }
  }
  useEffect(() =>{
    uploadUser();
  })
  function convertirFecha(fechaISO) {
    var fecha = new Date(fechaISO);
    fecha.setUTCHours(fecha.getUTCHours() - 6);
    var año = fecha.getFullYear();
    var mes = ('0' + (fecha.getUTCMonth() + 1)).slice(-2);
    var dia = ('0' + fecha.getUTCDate()).slice(-2);
    var diabien = parseInt(dia) + 1;
    var fechaFormateada = diabien + '-' + mes + '-' + año;
  
    return fechaFormateada;
  }
  const fecha = convertirFecha(user.fecha_nacimiento)
  return (
    <div className="contenedor_body_user">
      <div className="titulo_username_body">
        <h2>{user.nombre}</h2>
      </div>
      <div className="contenedor_img_user_body">
        <Img src={userimg} className="img_user_body" />
      </div>
      <div className="atributos_body_user">
        <div className="description_user">
          <p> Description: {user.descripcion}</p>
        </div>
          <button type="submit" onClick={handleChange}>Editar Descripcion:</button>
        <div className="age_user">
          <p> Age: {fecha} </p>
        </div>
      </div>
    </div>
  );
}

export default BodyUser;
