import React from 'react'
import Img from 'next/image'
import Lupa from "../public/assets/lupa.png"

function Buttominicio() {
  return (
    <button className='boton_barrabusqueda'>
          <Img src={Lupa}></Img>
    </button>

  )
}

export default Buttominicio
