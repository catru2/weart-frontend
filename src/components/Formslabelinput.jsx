import React from "react";

function Formslabelinput(props) {
  return (
    <div className="form_contenedor_subir_titulo_descripcion">
      <div className="contenedor_inputs_subir">
        <label className="Label_usuario">{props.titulo}</label>
        <input type={props.tipo} className="input_subir" onChange={props.fun} name={props.tipo}/>
      </div>
    </div>
  );
}

export default Formslabelinput;
