"use client"
import React from 'react'
import FormsUser from '@/components/FormsUser';
import BodyUser from '@/components/BodyUser';
import axios from 'axios';
import { useEffect,useState } from 'react';
function Userpage() {
  const [user, setUser] = useState(0);
  const uploadUser = async () =>{
    const res = await axios.get("http://localhost:80/usuarios/get/by/token", {withCredentials: true});
    setUser(res.data.data);
  }
  useEffect(()=>{
    uploadUser();
  },[])
  return (
 <div>
     <div className='imagen_colores'>
        {user ?(
          <>
          <BodyUser idUsuario={user}/>
          <FormsUser idUsuario={user}/>
          </>
        ):(
          <></>
        )}
    </div>
 </div>
  )
}

export default Userpage