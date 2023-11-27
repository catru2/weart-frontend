"use client"
import React from "react";
import Img from "next/image";
import userimg from "@/../public/assets/boton3.png";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import axios from "axios";
function BodyUser(props) {
  const params = useParams();
  console.log(params.id);
  const [user, setUser] = useState({});
  const uploadUser = async () => {
    let res=null
    if(params.id){
      res = await axios.get(`http://localhost:80/usuarios/${params.id}`, {withCredentials: true});
    }else{
      res = await axios.get(`http://localhost:80/usuarios/${props.idUsuario}`, {withCredentials: true});
    }
    setUser(res.data.data);
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
          <p> Description:</p>
        </div>
        <div className="age_user">
          <p> Age: {fecha} </p>
        </div>
      </div>
    </div>
  );
}

export default BodyUser;
