import React, { useState } from "react";

import NewBarrioForm from "./NewBarrioForm";

import { createNewBarrio } from "../../../utils/barrios";
import Alert from "../../Alert";

export default function NewBarrio(props) {
  const token = localStorage.getItem("access-token");

  const [status, setStatus] = useState({
    loading: false,
    messageError: "",
    error: null,
  });

  const [alert, setAlert] = useState(null);

  async function handleSubmit(newBarrio) {
    console.log(newBarrio);

    setStatus({
      ...status,
      loading: true,
    });
    console.log(token);
    createNewBarrio(newBarrio)
      .then(({ data }) => {
        setAlert(<Alert message="Nuevo Barrio Creado" severity="success" />);
        console.log(data);
      })
      .catch((err) => console.log(err));
    /*  try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
        data,
      };
      console.log("peticion enviada");
      let res = await Axios(`${url}/barrios`, config);
      console.log("peticion recibida", res);
      if (!res.data.ok) {
        console.log("peticion rechazada", res);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="error">{res.data.message} </Alert>,
        });
      } else {
        console.log("peticion aceptada recuperando token", res.data);
        //setToken(res.da)
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="success">{res.data.message} </Alert>,
        });
      }
     
    } catch (error) {
      console.log("error capturado", error);
 */
    /*    setStatus({
        loading: false,
        messageError: <Alert severity="error">Error de connección.</Alert>,
        error,
      });
    } */
  }

  return <NewBarrioForm alert={alert} handleSubmit={handleSubmit} />;
}
