"use client"
import Img from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Card(props) {
  const router = useRouter();
  const [usuario, setUsuario] = useState({});
  const [likes, setLikes] = useState(0);
  const [like,SetLike] = useState({});
  const [bandera, setBandera] = useState(false);

  const uploadUsuario = async () =>{
    const data = await axios.get(`http://localhost:80/usuarios/${props.idUsuario}` ,{withCredentials:true})
    setUsuario(data.data.data)
  }
  const uploadLikes = async () =>{
    const data = await axios.get(`http://localhost:80/likes/numero/${props.idPintura}` ,{withCredentials:true})
    setLikes(data.data.data)
  }
  const handleChange = async (e) =>{
    if(e.target.checked){
      if(!like && bandera == false){
        await axios.post(`http://localhost:80/likes/${props.idPintura}`,{} ,{withCredentials:true})
        setBandera(true)
      }
      if(like && bandera == false){
        await axios.put(`http://localhost:80/likes/${props.idPintura}`,{} ,{withCredentials:true})
        setBandera(true)
      }
    }else{
      await axios.delete(`http://localhost:80/likes/${props.idPintura}` ,{withCredentials:true})
      setBandera(false)
    }
  }

  
  const uploadMylike = async () =>{
    const res = await axios.get(`http://localhost:80/likes/getLikes/${props.idPintura}`, {withCredentials:true})
    SetLike(res.data.data[0]);
  }
  useEffect(() => {
    uploadUsuario();
    uploadLikes();
    uploadMylike();

    if(like){
      if(like.deleted == 0){
        setBandera(true);
      }
    }
    
  }, []);
  return (
    <div className="card__container">
      <div className="contenedor_texto_inicio">
        <Link href={`/logeado/user/${usuario.id_usuario}`} className="link__card">
          <p>{usuario.nombre}</p>
        </Link>
      </div>
      <div className="contenedor_imagen">
        <Img src={props.imagen} className="pintura_imagen" width={400} height={600} />
        <p className="nombre_usuario">{props.titulo}</p>
      </div>
      <div className="contenedor_like_comentarios">
        <div className="contador">
          <p>{likes}</p>

            <div className="heart-container" title="Like">
            <input type="checkbox" className="checkbox" id={`Give-It-An-Id${props.idPintura}`} onChange={handleChange} />
            <div className="svg-container">
              <svg
                viewBox="0 0 24 24"
                className="svg-outline"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="svg-filled"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                className="svg-celebrate"
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="10,10 20,20"></polygon>
                <polygon points="10,50 20,50"></polygon>
                <polygon points="20,80 30,70"></polygon>
                <polygon points="90,10 80,20"></polygon>
                <polygon points="90,50 80,50"></polygon>
                <polygon points="80,80 70,70"></polygon>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;
