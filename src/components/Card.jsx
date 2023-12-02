"use client";
import Img from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Heart from "./Heart";
function Card(props) {
  const [usuario, setUsuario] = useState({});
  const [likes, setLikes] = useState(0);
  const [like, SetLike] = useState({});
  const [bandera, setBandera] = useState(false);

  const uploadUsuario = async () => {
    const data = await axios.get(
      `http://localhost:80/usuarios/${props.idUsuario}`,
      { withCredentials: true }
    );
    setUsuario(data.data.data);
  };

  const uploadLikes = async () => {
    const data = await axios.get(
      `http://localhost:80/likes/numero/${props.idPintura}`,
      { withCredentials: true }
    );
    setLikes(data.data.data);
    
  };
  const handleChange = async (e) => {
    if (e.target.checked) {
      if (!like) {
        await axios.post(
          `http://localhost:80/likes/${props.idPintura}`,
          {},
          { withCredentials: true }
        );
      }
      if (like) {
        if(like.deleted == 1){
          await axios.put(
            `http://localhost:80/likes/${props.idPintura}`,
            {},
            { withCredentials: true }
          );
        }
      }
    } else {
      await axios.delete(`http://localhost:80/likes/${props.idPintura}`, {
        withCredentials: true,
      });
    }
  };  
  const uploadMylike = async () => {
    const res = await axios.get(
      `http://localhost:80/likes/getLikes/${props.idPintura}`,
      { withCredentials: true }
    );
    SetLike(res.data.data[0]);
  };

  useEffect(() => {

    uploadUsuario();
    uploadLikes();
    uploadMylike();
    
  }, [usuario]);
  
  
  return (
    <div className="card__container">
      <div className="contenedor_texto_inicio">
        <Link
          href={`/logeado/user/${usuario.id_usuario}`}
          className="link__card"
        >
          <p>{usuario.nombre}</p>
        </Link>
      </div>
      <div className="contenedor_imagen">
        <Img
          src={props.imagen}
          className="pintura_imagen"
          width={400}
          height={600}
          alt="imagen_pintura"
          priority
        />
        <p className="nombre_usuario">{props.titulo}</p>
      </div>
      <div className="contenedor_like_comentarios">
        <div className="contador">
          <p>{likes}</p>
          {like ? (
            like.deleted == 0 ? (
              <Heart idPintura={props.idPintura} boolean={true} handleChange={handleChange} />
            ) : (
              <Heart idPintura={props.idPintura} boolean={false} handleChange={handleChange} />
            )
          ) : (
            <Heart idPintura={props.idPintura} boolean={false} handleChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
