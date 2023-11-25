import React from 'react'
import NavbarUser from '../../../components/Navbaruser';
import FormsUser from '../../../components/FormsUser';
import BodyUser from '../../../components/BodyUser';
function Userpage() {
  return (
 <div>
     <NavbarUser/> 
     <div className='imagen_colores'>
        <BodyUser/>
      <FormsUser/>
    </div>
 </div>
  )
}

export default Userpage