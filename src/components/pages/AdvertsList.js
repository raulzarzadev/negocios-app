import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdvertCard from "../atomos/AdvertCard";
import Loading from "../atomos/Loading";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import NotFound from "./errors/NotFound";
import { useAds } from "../../context/adsContext";
import Filtro from "../Filtro";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";

export default function AdvertsList() {
  const {
    advertsByBarrio,
    getBarrioAdvert,
    loading,
    failBarrio,
    barrio,
  } = useAds();

  const { shortName } = useParams();
  useEffect(() => {
    getBarrioAdvert(shortName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortName]);

  const [adverts, setAdverts] = useState(undefined);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter === "") {
      setIsLoading(false);
      return setAdverts(advertsByBarrio);
    }
    setAdverts(filterAdsByLable(filter));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, advertsByBarrio]);

  const [isLoading, setIsLoading] = useState(true);

  const handleSetFilter = (filter) => {
    // if (!!filter) return setAdverts(adverts);
    setFilter(filter);
  };
  const filterAdsByLable = (filter) => {
    const filtered = advertsByBarrio?.filter((ad) => {
      return ad.labels.map((label) => label.value).includes(filter) && ad;
    });
    return filtered;
  };

  const labels = [];
  const auxArr = [];
  advertsByBarrio.forEach((ad) => {
    ad.labels.forEach((label) => {
      if (auxArr.includes(label.value)) return;
      auxArr.push(label.value);
      const chip = CHIP_LABELS.find((chip) => chip.value === label.value);
      labels.push(chip);
    });
  });

  if (failBarrio) return <NotFound errorMessage="Este lugar aun no existe" />;
  if (loading || isLoading) return <Loading />;
  return (
    <>
      <Filtro handleSetFilter={handleSetFilter} labels={labels} />
      <h3>{barrio.name} </h3>
      <p>{barrio.stateData?.label}</p>
      {adverts?.length > 0 ? (
        <Grid container spacing={1}>
          {adverts?.map((advert) => (
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
