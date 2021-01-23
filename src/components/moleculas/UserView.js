import React from "react";
import { Box, Typography } from "@material-ui/core";
import UserAdvertsDisplay from "../moleculas/UserAdvertsDisplay";
import MyButton from "../atomos/MyButton";
import MyLink from "../atomos/MyLink";

function UserView({ user, favoriteAds, publishedAdverts, advertsCreated }) {
  return (
    <Box my={3}>
      <Typography variant="h4">Usuario </Typography>
      <Typography variant="p"> {user.email}</Typography>
      <Typography>
        Credit:<strong> ${user?.credit?.toFixed(2) || "0.00"}</strong>
      </Typography>

      <Box p={2} display="flex" justifyContent="center">
        <Box m={2}>
          <MyButton variant="outlined">
            <MyLink to="/nuevo-barrio">Nuevo Barrio</MyLink>
          </MyButton>
        </Box>
        <Box m={2}>
          <MyButton variant="contained" color="primary">
            <MyLink to="/nuevo-anuncio">Crear anuncio</MyLink>
          </MyButton>
        </Box>
      </Box>

      <UserAdvertsDisplay
        title="Anuncios Guardados"
        noAdvertsTitle="Aún no has GUARDADO aununcios."
        adverts={favoriteAds}
      />

      <UserAdvertsDisplay
        title="Anuncios Publicados"
        noAdvertsTitle="No hay anuncios PUBLICADOS aún."
        adverts={publishedAdverts}
        publishArea={true}
        admin
      />
      <UserAdvertsDisplay
        title="Anuncios Creados"
        noAdvertsTitle="No has CREADO anuncios aún."
        adverts={advertsCreated}
        admin
      />
    </Box>
  );
}

export default UserView;
