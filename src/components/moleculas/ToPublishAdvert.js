import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MySelectInput from "../atomos/MySelectInput";
import MyButton from "../atomos/MyButton";
import { getAllBarrios, updateAdvert } from "../../utils/adverts";
import Loading from "../atomos/Loading";

export default function ToPublishAdvert({ advert, closeModal, refetch }) {
  const [state, setState] = useState("");
  const [barrio, setBarrio] = useState("");
  const [barrios, setBarrios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barriosList, setBarriosList] = useState([]);

  useEffect(() => {
    getAllBarrios().then((res) => {
      setBarrios(res.data.barrios);
      setLoading(false);
    });
  }, []);
  const handleChangeState = (e) => {
    setState(e.target.value);
    setBarrio("");
    setBarriosList(setBarriosByState(e.target.value));
  };

  const handleSelectBarrio = (e) => {
    setBarrio(e.target.value);
    //setBarriosList(e.target.value)
  };

  const setBarriosByState = (state) => {
    const list = barrios.filter((barrio) => barrio.state === state);
    let newBarriosList = [];
    list.map((barrio) =>
      newBarriosList.push({
        value: barrio._id,
        label: barrio.name,
        tag: barrio.state,
      })
    );
    return newBarriosList;
  };


  const statesList = newList();

  function newList() {
    let list = [];
    let auxArr = [];
    barrios.map((barrio) => {
      if (!auxArr.includes(barrio.state)) {
        auxArr.push(barrio.state);
        list.push(barrio.stateData);
      }
      return 0;
    });
    return list;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateAdvert(advert._id, {
      ...advert,
      isPublished: true,
      publishedOn: [barrio],
    })
      .then((res) => {
        //console.log(res.data)
        //window.location.href = "/dashboard";
        refetch();
        closeModal();
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(barriosList);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography>¿Donde prefieres publicar tu anuncio?</Typography>
        <Box my={2}>
          <MySelectInput
            value={state}
            name="state"
            label="Estado"
            placeholder="Selecciona un Estado"
            options={statesList}
            onChange={handleChangeState}
          />
        </Box>
        {state !== "" && (
          <Box>
            <MySelectInput
              value={barrio}
              name="barrio"
              label="Barrio"
              placeholder="Selecciona un Barrio"
              options={barriosList}
              onChange={handleSelectBarrio}
            />
          </Box>
        )}

        <Box m={2} display="flex" justifyContent="center">
          {loading ? (
            <Loading />
          ) : (
            <MyButton type="submit" variant="contained" color="primary">
              Publicar anuncio!
            </MyButton>
          )}
        </Box>
      </form>
    </div>
  );
}
