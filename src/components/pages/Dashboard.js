import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAds } from "../../context/adsContext";
import { useUser } from "../../context/userContext";
import Loading from "../atomos/Loading";
import MyButton from "../atomos/MyButton";
import AdvertManage from "../moleculas/AdverManage";

export default function Dashboard() {
  const { user } = useUser();

  const { allAdverts, refetchAllAds, loading, userAdverts } = useAds();

  console.log(userAdverts);

  useEffect(() => {
    refetchAllAds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user?.email}</Typography>
      <Typography>
        Credit:<strong> ${user?.credit?.toFixed(2)}</strong>
      </Typography>

      <Box p={2} display="flex" justifyContent="center">
        <Box m={2}>
          <MyButton variant="outlined">Nuevo Barrio</MyButton>
        </Box>
      </Box>
      <ManagerAdvertsView
        handleRefetch={refetchAllAds}
        adverts={userAdverts}
        title="Ads Propios"
      />
      <ManagerAdvertsView
        handleRefetch={refetchAllAds}
        adverts={allAdverts}
        title="Todos los Ads"
      />
    </Box>
  );
}

function ManagerAdvertsView({ adverts, title, handleRefetch }) {
  adverts.sort((a, b) => {
    if (!a.isPublished) return 1;
    if (a.isPublished) return -1;
    return 0;
  });

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Grid container>
        <Grid item xs={12} container>
          <Grid item xs={3}>
            <Typography variant="h6" noWrap>
              <div>Titulo</div>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" noWrap>
              Descripción
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="p" noWrap style={{ fontSize: "14px" }}>
              ¿Pub?
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6" noWrap>
              Acciones
            </Typography>
          </Grid>
        </Grid>

        {adverts?.map((advert) => (
          <AdvertManage advert={advert} refetch={handleRefetch} />
        ))}
      </Grid>
    </Box>
  );
}
