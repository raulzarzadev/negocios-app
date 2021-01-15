import React, { useState } from "react";

import NewBarrioForm from "./NewBarrioForm";

import { createNewBarrio } from "../../../utils/barrios";
import Alert from "../../Alert";

export default function NewBarrio() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function handleSubmit(newBarrio) {
    setLoading(true);
    createNewBarrio(newBarrio)
      .then(({ data }) => {
        setAlert(<Alert message="Nuevo Barrio Creado" severity="success" />);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/";
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <NewBarrioForm
      alert={alert}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}
