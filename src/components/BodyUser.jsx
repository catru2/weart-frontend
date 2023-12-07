"use client"
import React from "react";
import Img from "next/image";
import userimg from "@/../public/assets/boton3.png";
import { useParams,useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import "./Estilos.css"
import Pusher from "pusher-js";
function BodyUser(props) {
  const params = useParams();
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState(0);
  const [seguido, setSeguido] = useState({});
  const [bandera, setBandera] = useState(false);
  const uploadUser = async () => {
    let res=null
    if(params.id){
      res = await axios.get(`http://34.225.204.31/usuarios/${params.id}`, {withCredentials: true});
    }else{
      res = await axios.get(`http://34.225.204.31/usuarios/${props.idUsuario}`, {withCredentials: true});
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
    mandarAxios(text);
  }

  const obtenerToken = async () => {
    const res = await axios.get("http://34.225.204.31/usuarios/get/by/token", {withCredentials: true});
    setUserToken(res.data.data);
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      if(!seguido){
        await axios.post(`http://34.225.204.31/seguidores/${params.id}`, {}, {withCredentials:true})
        setBandera(true);
        alert("Ahora sigues a este usuario")
      }
      if(seguido){
        if(seguido.deleted == 1){
          await axios.patch(`http://34.225.204.31/seguidores/${params.id}`, {}, {withCredentials:true})
          setBandera(true);
          alert("Ahora sigues de nuevo a este usuario")
        }
      }
  }
  const handleSubmitDejarSeguir = async (e) =>{
    e.preventDefault()
    await axios.delete(`http://34.225.204.31/seguidores/${params.id}`, {withCredentials:true})
    setBandera(false);
    alert("Ahora no sigues a este usuario")
  }
  
  const mandarAxios = async (text) => {
    if(props.idUsuario && text){
      await axios.patch("http://34.225.204.31/usuarios",{descripcion:text},{withCredentials:true})
    }
  }

  const uploadSeguidor = async () => {
    try{
      const res = await axios.get(`http://34.225.204.31/seguidores/bandera/${params.id}`, {withCredentials: true});
      setSeguido(res.data.data[0]);
      if(res.data.data[0]){
        if(res.data.data[0].deleted == 0)
          setBandera(true)
      }else{
        setBandera(false);
      }
    }catch(error){
      console.log(error)
    }
  }


  useEffect(() =>{
    uploadUser();
    obtenerToken();
    uploadSeguidor();

    const pusher = new Pusher("d7b4aa0b4fd81f28bd44",{
      cluster: "us2"
    })

    const channel = pusher.subscribe("like");
    channel.bind("weart", function(data){
    setSeguido(prevSeguido => [...prevSeguido, data]);
  }
  )},[])



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
      {params.id ? (
            <></>
           ):(
            <button onClick={handleChange} className="edit_description__btn">Editar Descripcion</button>
           )}
        <h2>{user.nombre}</h2>
        {params.id ? (<>
        </>):(
          <button className="edit_description__btn">Cerrar Sesion</button>
        )}
      </div>
      <div className="contenedor_img_user_body">
        <Img src={userimg} className="img_user_body" />
      </div>
      <div className="atributos_body_user">
        <div className="description_user">
          <p> Description: {user.biografia}</p>
        </div>
        <div className="age_user">
          <p> Age: {fecha} </p>
        </div>
      </div>
      {params.id != userToken && params.id && bandera==false ? (
        <form onSubmit={handleSubmit}>
          <div className="btn_add_friend__container">
            <button className="btn_add_friend">Agregar amigo</button>
          </div>
        </form>
      ):(
        params.id != userToken && params.id && bandera==true ?(
          <form onSubmit={handleSubmitDejarSeguir}>
            <div className="btn_add_friend__container">
              <button className="btn_add_friend">Dejar de seguir</button>
            </div>
          </form>
        ):(
        <></>
        )
      )}
    </div>
  );
}

export default BodyUser;
