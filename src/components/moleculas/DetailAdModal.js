import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AdvertCard from "../atomos/AdvertCard";
import MyModal from "../atomos/MyModal";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useAds } from "../../context/adsContext";
import { deleteAdvert, updateAdvert } from "../../utils/adverts";

import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ToPublishAdvert from "./ToPublishAdvert";

export default function DetailAdModal({ opened, setOpened, advert }) {
  const history = useHistory();
  const { refetchAllAds } = useAds();
  const { isPublished, _id } = advert;

  const [openPublish, setOpenPublish] = useState();
  function handleOpenPublishModal() {
    setOpenPublish(!openPublish);
  }
  const [openDelete, setOpenDelete] = useState(false);
  function handleOpenDeleteModal() {
    setOpenDelete(!openDelete);
  }

  function handleEdit(id) {
    history.push(`/editar/${id}`);
  }

  async function handleDeleteAdvert(id) {
    await deleteAdvert(id)
      .then((res) => {
        refetchAllAds();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenDelete(false);
  }

  function handleUnpublish() {
    updateAdvert(advert._id, {
      ...advert,
      isPublished: false,
      publishedOn: [],
    })
      .then((res) => {
        console.log(res.data);
        console.log("update adverts");
        refetchAllAds();
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <MyModal
        title="Detalles de anuncio"
        open={opened}
        handleOpenModal={setOpened}
      >
        <Box display="flex" justifyContent="center">
          <Box width={240}>
            <AdvertCard advert={advert} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Box p={1} textAlign="center">
              {isPublished ? (
                <>
                  <CheckCircleIcon
                    fontSize="small"
                    style={{ color: "green" }}
                  />
                  <FormLabel component="legend">Publicado</FormLabel>

                </>
              ) : (
                <>
                  <CancelIcon fontSize="small" style={{ color: "red" }} />
                  <FormLabel component="legend">No publicado</FormLabel>
                </>
              )}
            </Box>

            {isPublished ? (
              <Tooltip title="Despublicar">
                <IconButton
                  size="small"
                  onClick={handleUnpublish}
                  style={{ color: "red" }}
                >
                  <GetAppIcon />
                  <FormLabel component="legend">despublicar</FormLabel>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Publicar">
                <IconButton
                  size="small"
                  onClick={handleOpenPublishModal}
                  //color="primary"
                >
                  <PublishIcon />{" "}
                  <FormLabel component="legend">publicar</FormLabel>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => handleEdit(_id)}>
                <EditIcon /> <FormLabel component="legend">editar</FormLabel>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" onClick={handleOpenDeleteModal}>
                <DeleteForeverIcon style={{ color: "red" }} />{" "}
                <FormLabel component="legend">eliminar</FormLabel>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </MyModal>
      <MyModal
        title="Eliminar anuncio"
        open={openDelete}
        handleOpenModal={setOpenDelete}
      >
        <Typography variant="p" align="center">
          Para eliminar el siguiente anuncio, da click en
          <strong>'eliminar anuncio'</strong>
        </Typography>
        <Box my={2}>
          <AdvertCard advert={advert} />
        </Box>
        <Box marginTop={2}>
          <Typography>
            <em>Esta accion no se puede deshacer!</em>
          </Typography>
          <Box display="flex" justifyContent="center" m={1}>
            <Button
              variant="outlined"
              style={{ color: "red" }}
              onClick={() => handleDeleteAdvert(_id)}
            >
              Eliminar anuncio
            </Button>
          </Box>
        </Box>
      </MyModal>
      <MyModal
        title="Publicar anuncio"
        open={openPublish}
        handleOpenModal={handleOpenPublishModal}
      >
        <ToPublishAdvert
          advert={advert}
          closeModal={handleOpenPublishModal}
          refetch={refetchAllAds}
        />
      </MyModal>
    </>
  );
}
