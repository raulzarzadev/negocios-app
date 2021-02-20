import Axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { getToken } from "../utils/token";

import {
  getAdvertsByBarrio,
  getAllAdverts,
  getUserAdverts,
} from "../utils/adverts";
import { useUser } from "./userContext";

const AdsContext = React.createContext();

export function AdsProvider(props) {
  const { user, isLogged } = useUser();
  const [token] = useState(getToken());
  const [loading, setLoading] = useState(true);
  const [allAdverts, setAllAdverts] = useState([]);
  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "access-token": token,
  };

  async function refetchAllAds() {
    await getUserAdverts(user._id)
      .then(({ data }) => {
        setUserAdverts(data.adverts);
      })
      .catch((err) => {
        console.log(err);
      });
    await getAllAdverts()
      .then(({ data }) => {
        setAllAdverts(data?.adverts);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("get all");
    return "done";
  }

  const [userAdverts, setUserAdverts] = useState([]);

  useEffect(() => {
    if (isLogged) {
      refetchAllAds().then((res) => console.log(res));
    } else {
      console.log("No logged");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const [barrio, setBarrio] = useState({});
  const [advertsByBarrio, setAdvertsByBarrio] = useState([]);
  const [failBarrio, setFailBarrio] = useState(false);

  async function getBarrioAdvert(shortName) {
    setLoading(true);
    await getAdvertsByBarrio(shortName)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          setBarrio(res.data.barrio);
          setAdvertsByBarrio(res.data.adverts);
        } else {
          setFailBarrio(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
