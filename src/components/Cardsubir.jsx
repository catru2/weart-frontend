import React from "react";
import Img from "next/image";
import subir from "@/../public/assets/boton1.png";
function Cardsubir(props) {
  return (
    <div>
      {props.imagen ? (
          <div className="contenedor_img_subida">
          <input
            className="boton_foto_subir"
            type="file"
            onChange={(e) => {
              props.fun(e.target.files[0]);
            }}
          />
          <Img src={URL.createObjectURL(props.imagen)} className="card_subida" width={500} height={500}/>
        </div>
      ):(
        <div className="contenedor_img_subir">
        <input
          className="boton_foto_subir"
          type="file"
          onChange={(e) => {
            props.fun(e.target.files[0]);
          }}
        />
        <Img src={subir} className="card_subir" />
      </div>
      )}
    </div>
  );
}

export default Cardsubir;
