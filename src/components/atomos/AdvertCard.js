import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import defaultImage from "../../assets/negdelbar_logo.png";
import { useHistory } from "react-router-dom";
import Loading from "../atomos/Loading";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from "@material-ui/core";
import MyModal from "./MyModal";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";
import ContactLink from "./ContactLink";
import ToPublishAdvert from "../moleculas/ToPublishAdvert";
import { deleteAdvert, updateAdvert } from "../../utils/adverts";
import { useFavorites } from "../../context/favoritContext";
import { useAds } from "../../context/adsContext";
import DetailAdModal from "../moleculas/DetailAdModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "inherit",
  },
  labelsBox: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "16px",
    },
  },
  contactsBox: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
  advertTitle: {
    fontSize: 15,
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
  },
  actionsAdvert: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardMedia: {
    height: 70,
    objectFit: "cover",
  },
  cardContent: {
    padding: theme.spacing(0.5),
  },
}));

function AdvertCard({ advert = {}, admin = false, publishArea = false }) {
  const {
    title,
    description,
    image,
    googleLocation,
    labels = [],
    backgroundColor,
    location,
    isPublished,
    _id,
    contacts,
  } = advert;

  const { favoriteList, addFavorite, removeFavorite } = useFavorites();
  const { refetchAllAds } = useAds();
  const classes = useStyles();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = (advertId) => {
    history.push(`/editar/${advertId}`);
  };
  const handleDeleteAdvert = (id) => {
    setLoading(true);
    deleteAdvert(id)
      .then((res) => {
        refetchAllAds();
        setLoading(false);
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
    handleCloseMenu();
  };
  const handleUnpublish = () => {
    updateAdvert(advert._id, {
      ...advert,
      isPublished: false,
      publishedOn: [],
    })
      .then((res) => refetchAllAds())
      .catch((err) => console.log(err));
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSaveFavorite = () => {
    setSavedAsFavorite(true);
    addFavorite(advert._id);
  };

  const handleDeleteFavorite = () => {
    setSavedAsFavorite(false);
    removeFavorite(advert._id);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  const [savedAsFavorite, setSavedAsFavorite] = useState(false);

  useEffect(() => {
    setSavedAsFavorite(favoriteList?.includes(advert._id));
  }, [favoriteList, advert._id]);

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.labelsBox} style={{ backgroundColor }}>
          <Box className={classes.actionsAdvert}>
            {admin ? (
              <Tooltip title="Opciones">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            ) : savedAsFavorite ? (
              <Tooltip title="Borrar de favoritos">
                <IconButton onClick={handleDeleteFavorite}>
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Guardar como favorito">
                <IconButton onClick={handleSaveFavorite}>
                  <BookmarkBorderIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box>
            {labels?.map((label, i) => (
              <Tooltip
                key={i}
                title={label.label}
                style={{ fontSize: 18, margin: "0 2px" }}
              >
                <SvgIcon>
                  {CHIP_LABELS.map(
                    (chip) => chip.value === label.value && chip.icon
                  )}
                </SvgIcon>
              </Tooltip>
            ))}
          </Box>
        </Box>
        <CardActionArea
        //onClick={handleOpenModal}
        >
          <CardMedia
            component="img"
            alt={title}
            className={classes.cardMedia}
            src={image?.src || defaultImage}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.advertTitle}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              classes={classes.advertDescription}
            >
              {description?.length > 80
                ? description.slice(0, 80) + "..."
                : description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions style={{ backgroundColor }}>
          <Box className={classes.contactsBox}>
            {location && (
              <Tooltip title=" Ubicación">
                <IconButton href={googleLocation}>
                  <LocationOnIcon />
                </IconButton>
              </Tooltip>
            )}
            {contacts?.map((contact) => (
              <ContactLink contact={contact} />
            ))}
          </Box>
        </CardActions>
      </Card>
      {/* MODALES  */}

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
          <AdvertCard advert={advert} />
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
      <MyModal open={openModal} handleOpenModal={handleOpenModal}>
        <div> Aca iria el menu</div>
      </MyModal>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleOpenDetails();
            handleCloseMenu();
          }}
        >
          Detalles
        </MenuItem>

        {isPublished ? (
          <MenuItem
            onClick={() => {
              handleUnpublish();
              handleCloseMenu();
            }}
          >
            Despublicar
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleOpenPublishModal();
              handleCloseMenu();
            }}
          >
            Publicar
          </MenuItem>
        )}

        {!publishArea && (
          <>
            <MenuItem
              onClick={() => {
                handleEdit(_id);
                handleCloseMenu();
              }}
            >
              Editar
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleOpenDeleteModal();
                handleCloseMenu();
              }}
            >
              <div style={{ border: "solid 3px red", padding: "4px" }}>
                Eliminar
              </div>
            </MenuItem>
          </>
        )}
      </Menu>
      <DetailAdModal
        opened={openDetails}
        setOpened={handleOpenDetails}
        advert={advert}
      />
    </>
  );
}

export default AdvertCard;
