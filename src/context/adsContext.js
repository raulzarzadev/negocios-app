import Axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { getToken } from "../utils/token";

import {
  getAdvertsByBarrio,
  getAdvertsByOwner,
  getAllAdverts,
} from "../utils/adverts";
import { useUser } from "./userContext";

const AdsContext = React.createContext();

export function AdsProvider(props) {
  const { user } = useUser();
  const [userId] = useState(user._id || "");
  const [token] = useState(getToken());
  const [loading, setLoading] = useState(true);
  const [allAdverts, setAllAdverts] = useState([]);
  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  function refetchAllAds() {
    console.log("refetch");
    getAllAdverts()
      .then(({ data }) => {
        setLoading(false);
        setAllAdverts(data?.adverts);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  const [userAdverts, ] = useState([]);
  function getUserAdverts(owner) {
    getAdvertsByOwner(owner)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUserAdverts(userId);
  }, [userId]);

  const [barrio, setBarrio] = useState({});
  const [advertsByBarrio, setAdvertsByBarrio] = useState([]);
  const [failBarrio, setFailBarrio] = useState(false);

  async function getBarrioAdvert(shortName) {
    getAdvertsByBarrio(shortName)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          setBarrio(res.data.barrio);
          setAdvertsByBarrio(res.data.adverts);
        } else {
          setFailBarrio(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  const value = useMemo(() => {
    return {
      loading,
      allAdverts,
      barrio,
      advertsByBarrio,
      failBarrio,
      userAdverts,
      refetchAllAds,
      getBarrioAdvert,
    };
  }, [loading, allAdverts, barrio, advertsByBarrio, failBarrio, userAdverts]);

  return <AdsContext.Provider value={value} {...props} />;
}
export function useAds() {
  const context = React.useContext(AdsContext);
  if (!context) {
    throw new Error("useAds deberia estar dentro del proveedor AdsContext");
  }
  return context;
}
