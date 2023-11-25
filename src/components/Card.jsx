import React from 'react'
import Img from 'next/image'
import Pintura from '../public/assets/pintura.png'
import Like from '../public/assets/like.png'
import comentario from '../public/assets/comentario.png'

function Card() {
  return (
<div>
        <div className='contenedor_texto_inicio'>
          <p>User</p>
          <p>Category</p>
        </div>
        <div className='contenedor_imagen'>
          <Img src={Pintura} className='pintura_imagen' />
          <p className='nombre_usuario'>Name</p>
        </div>
        <div className='contenedor_like_comentarios'>
          <Img src={comentario} className='like_comentario' />
          <div className='contador'>
            <p>000</p>
            <Img src={Like} className='like_comentario' />
          </div>
        </div>
      </div>

  )
}

export default Card