import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { getAllAdverts } from "../../utils/adverts";
import Loading from "../atomos/Loading";
import MyButton from "../atomos/MyButton";
import AdvertManage from "../moleculas/AdverManage";

export default function Dashboard() {
  const { user } = useUser();

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoadign] = useState(true);
  const [allAdverts, setAllAdverts] = useState([]);
  useEffect(() => {
    getAllAdverts()
      .then(({ data }) => {
        console.log(data);
        setAdverts(user?.adverts);
        setAllAdverts(data?.adverts);
        setLoadign(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
      <ManagerAdvertsView adverts={adverts} title="Ads Propios" />
      <ManagerAdvertsView adverts={allAdverts} title="Todos los Ads" />
    </Box>
  );
}

function ManagerAdvertsView({ adverts, title }) {
  function handleSortByTitle(title) {
    console.log(title);
    return adverts.sort((a, b) => {
      if (a[title] > b[title]) return 1;
      if (a[title] < b[title]) return -1;
      return 0;
    });
  }
  console.log(adverts[0]);
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Grid container>
        <Grid item xs={12} container>
          <Grid item xs={3}>
            <Typography variant="h6" noWrap>
              <div onClick={() => handleSortByTitle("title")}>Titulo</div>
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
          <AdvertManage advert={advert} />
        ))}
      </Grid>
    </Box>
  );
}
