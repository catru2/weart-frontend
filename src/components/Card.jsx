"use client";
import Img from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Heart from "./Heart";
import eliminar from "@../../../public/assets/boton-eliminar.png"
import editar from "@../../../public/assets/dibujo.png"
import Swal from 'sweetalert2'
import { useParams,useRouter } from "next/navigation";

function Card(props) {
  const params = useParams();
  const router = useRouter()
  const [usuario, setUsuario] = useState({});
  const [likes, setLikes] = useState(0);
  const [like, SetLike] = useState({});

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

  const handleDelete = async (e) => {
    Swal.fire({
      title: "Seguro que quieres eliminar esta publicacion?",
      text: "No podras revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:80/pinturas/${props.idPintura}`, {withCredentials:true})
        Swal.fire({
          title: "Eliminado!",
          text: "Tu publicacion se elimino.",
          icon: "success"
        });
        router.refresh()
      }
    });
  }
  const handleEdit = async (e) => {
    e.preventDefault()
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Ingresa la nueva descripcion de tu pintura",
      inputPlaceholder: "Escribe la descricion aquí...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });

    if(text){
      axios.patch(`http://localhost:80/pinturas/${props.idPintura}`, {titulo:text}, {withCredentials:true})
    Swal.fire({
      title: "Actualizado!",
      text: "Tu publicacion se actualizo.",
      icon: "success"
    });
    router.refresh()
    }
  }

  useEffect(() => {
    uploadUsuario();
    uploadLikes();
    uploadMylike();
  }, [usuario]);
  
  
  return (
    <div className="card__container">
      <div className="contenedor_texto_inicio">
      <div className="user__link">
        <Link
          href={`/logeado/user/${usuario.id_usuario}`}
          className="link__card"
        >
          <p>{usuario.nombre}</p>
        </Link>
        
      </div>
      {
            !params.id && props.usuarioCurrent ? (
              <div className="tools__container">
              <Img src={editar} width={30} height={30} alt="editar" className="btn_tools" onClick={handleEdit}/>
              <Img src={eliminar} width={30} height={30} alt="eliminar" className="btn_tools" onClick={handleDelete} />
              </div>
            ):(
              <></>
            )
          }
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
