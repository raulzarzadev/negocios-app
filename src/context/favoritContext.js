import Axios from "axios";
import { decode } from "jsonwebtoken";
import React, { useState, useEffect, useMemo } from "react";
import {
  deleteFavoriteAdvert,
  getFavoriteAds,
  getFavoritesList,
  saveFavoriteAdvert,
} from "../utils/adverts";
import { getToken } from "../utils/token";

const FavoriteContext = React.createContext();

export function FavoriteProvider(props) {
  const [token] = useState(getToken());
  const [id] = useState(decode(token)?.id || "");

  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteAds, setFavoriteAds] = useState([]);

  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  useEffect(() => {
    if(!id) return 
    updateFavoriteAdsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateFavoriteAdsList() {
    getFavoritesList(id)
      .then(({ data }) => setFavoriteList(data.favoriteAdverts))
      .catch((err) => console.log(err));
    getFavoriteAds(id)
      .then(({ data }) => {
        setFavoriteAds(data.adverts);
      })
      .catch((err) => console.log(err));
  }

  const addFavorite = (advertId) => {
    console.log("add");
    saveFavoriteAdvert(id, advertId)
      .then((res) => updateFavoriteAdsList())
      .catch((err) => console.log(err));
  };
  const removeFavorite = (advertId) => {
    deleteFavoriteAdvert(id, advertId)
      .then((res) => updateFavoriteAdsList())
      .catch((err) => console.log(err));
  };

  const value = useMemo(() => {
    return {
      favoriteList,
      favoriteAds,
      addFavorite,
      removeFavorite,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteAds, favoriteList]);

  return <FavoriteContext.Provider value={value} {...props} />;
}
export function useFavorites() {
  const context = React.useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useUser deberia estar dentro del proveedor FavoriteContext"
    );
  }
  return context;
}
