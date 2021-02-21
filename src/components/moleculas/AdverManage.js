import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Loading from "../atomos/Loading";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ToPublishAdvert from "../moleculas/ToPublishAdvert";
import { deleteAdvert, updateAdvert } from "../../utils/adverts";
import AdvertCart from "../atomos/AdvertCard";
import MyModal from "../atomos/MyModal";

import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DetailsIcon from "@material-ui/icons/Details";
import { useAds } from "../../context/adsContext";
import DetailAdminAdModal from "./DetailAdminAdModal";

export default function AdvertManage({ advert = {} }) {
  const { title, description, isPublished, _id } = advert;

  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchAllAds } = useAds();

  const handleDeleteAdvert = (id) => {
    setLoading(true);
    deleteAdvert(id)
      .then((res) => {
        refetchAllAds();
        setDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleOpenPublishModal = () => {
    setPublishModal(!publishModal);
  };

  const handleUnpublish = () => {
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
  }; 

  const handleEdit = (advertId) => {
    history.push(`/editar/${advertId}`);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <>
      <Grid item xs={12} container style={{ margin: "8px 0" }}>
        <Grid item xs={3}>
          <Typography noWrap>{title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap>{description}</Typography>
        </Grid>

        <Grid item xs={2}>
          {isPublished ? (
            <CheckCircleIcon fontSize="small" style={{ color: "green" }} />
          ) : (
            <CancelIcon fontSize="small" style={{ color: "gray" }} />
          )}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="space-around">
            {isPublished ? (
              <Tooltip title="Despublicar">
                <IconButton
                  size="small"
                  onClick={handleUnpublish}
                  style={{ color: "red" }}
                >
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Publicar">
                <IconButton size="small" onClick={handleOpenPublishModal}>
                  <PublishIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => handleEdit(_id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton
                size="small"
                onClick={() => handleOpenDetails(_id)}
              >
                <DetailsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" onClick={handleOpenDeleteModal}>
                <DeleteForeverIcon fontSize="small" style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <MyModal
        title="Publicar anuncio"
        open={publishModal}
        handleOpenModal={handleOpenPublishModal}
      >
        <ToPublishAdvert
          advert={advert}
          closeModal={handleOpenPublishModal}
          refetch={refetchAllAds}
        />
      </MyModal>
      <MyModal
        title="Eliminar anuncio"
        open={deleteModal}
        handleOpenModal={handleOpenDeleteModal}
      >
        <Typography variant="p" align="center">
          Para eliminar el siguiente anuncio, da click en
          <strong>'eliminar anuncio'</strong>
        </Typography>
        <Box my={2}>
          <AdvertCart advert={advert} />
        </Box>
        <Box marginTop={2}>
          <Typography>
            <em>Esta accion no se puede deshacer!</em>
          </Typography>
          <Box display="flex" justifyContent="center" m={1}>
            {loading ? (
              <Loading />
            ) : (
              <Button
                variant="outlined"
                style={{ color: "red" }}
                onClick={() => handleDeleteAdvert(_id)}
              >
                Eliminar anuncio
              </Button>
            )}
          </Box>
        </Box>
      </MyModal>
      <DetailAdminAdModal
        opened={openDetails}
        setOpened={handleOpenDetails}
        advert={advert}
      />
    </>
  );
}
