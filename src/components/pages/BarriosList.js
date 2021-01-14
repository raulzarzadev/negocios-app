import React, { useEffect, useState } from "react";
import StateList from "../pages/StateList";
import Loading from "../atomos/Loading";
import { getAllBarrios, getPublishedAdverts } from "../../utils/adverts";

export default function BarriosList() {
  const [loading, setLoading] = useState(true);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    getAllBarrios()
      .then((res) => {
        setBarrios(res.data.barrios);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    getPublishedAdverts()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let statesList = [];
  let auxList = [];
  barrios.map(
    (barrio) =>
      !auxList.includes(barrio.state) &&
      auxList.push(barrio.state) &&
      statesList.push(barrio.stateData)
  );

  const barriosByState = statesList.map((state) => {
    let barriosByState = [];
    barrios?.map(
      (barrio) => barrio.state === state.tag && barriosByState.push(barrio)
    );
    return { ...state, barrios: barriosByState };
  });

  if (loading) return <Loading />;

  return <StateList barrios={barriosByState} />;
}
