import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdvertCard from "../atomos/AdvertCard";
import Loading from "../atomos/Loading";
import { getAdvertsByBarrio } from "../../utils/adverts";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import NotFound from "./errors/NotFound";
import { useAds } from "../../context/adsContext";

export default function AdvertsList() {
  const {
    advertsByBarrio,
    getBarrioAdvert,
    loading,
    failBarrio,
    barrio,
  } = useAds();
  const adverts = advertsByBarrio;
  const { shortName } = useParams();
  useEffect(() => {
    getBarrioAdvert(shortName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortName]);

  if (failBarrio) return <NotFound errorMessage="Este lugar aun no existe" />;
  if (loading) return <Loading />;

  return (
    <>
      <h3>{barrio.name}</h3>
      <p>{barrio.stateData?.label}</p>
      {adverts.length > 0 ? (
        <Grid container spacing={1}>
          {adverts.map((advert) => (
            <Grid item xs={6} sm={4} md={3} key={advert._id}>
              <AdvertCard advert={advert} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <h4>Aun no hay anuncios publicados aquí</h4>
          <hr />
          <Button variant="contained" color="primary" href="/nuevo-anuncio">
            Crea anuncio
          </Button>
        </>
      )}
    </>
  );
}
