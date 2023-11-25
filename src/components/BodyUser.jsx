import React from "react";
import Img from "next/image";
import userimg from "../public/assets/boton3.png";
function BodyUser() {
  return (
    <div className="contenedor_body_user">
      <div className="titulo_username_body">
        <p>User_Name</p>
      </div>
      <div className="contenedor_img_user_body">
        <Img src={userimg} className="img_user_body" />
      </div>
      <div className="atributos_body_user">
        <div className="description_user">
          <p> Description:</p>
        </div>
        <div className="age_user">
          <p> Age: </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default BodyUser;
