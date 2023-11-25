import React from 'react'

import Formslabelinput from './Formslabelinput';
import Labellogin from './Labellogin';
import Buttomsubir from './Buttomsubir';
import Buttomlogindife from './Buttomlogindife';
import Buttomcancelar from './Buttomcancelar';
function BodySubir() {
  return (
      <div className='contenedor_caracteristicas_subir'>
        <div className='mover'>
          <Labellogin titulo="Categorias"/>
          <div>
          <select className='selectsubir'>
            <option value="1"></option>
            <option value="2">Picture</option>
            <option value="3">Painting</option>
          </select>
          </div>
          <div className='contenedor_input_subir'>

            <Formslabelinput titulo="Título" tipo="titulo" />
            <Formslabelinput titulo="Descripción" tipo="descripcion" />
          </div>
          <div className='contendor_botones_subir'>
          <Buttomsubir tipo="Subir"/>
          <Buttomcancelar tipo="Cancelar"/>
        </div>
        </div>
        
      </div>
  )
}

export default BodySubir;