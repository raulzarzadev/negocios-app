import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../URLS";
import { getToken } from "../utils/token";
const token = getToken();

const URL = BACKEND_URL;
axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "access-token": token,
};

export function createNewBarrio(newBarrio) {
  return axios.post(`${URL}/barrios`, newBarrio);
}

export function useBarrios(props) {
  const [barrios, setBarrios] = useState();
  
  const getBarrios = () => {
    return axios.get(`${URL}/barrios`);
  };

  return { getBarrios };
}
