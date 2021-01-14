import axios from "axios";
import { BACKEND_URL } from "../URLS";
import { getToken } from "./token";
const token = getToken();

const URL = BACKEND_URL;
axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "access-token": token,
};

export function getBarrios() {
  return axios.get(`${URL}/barrios`);
}

export function createNewBarrio(newBarrio) {
  return axios.post(`${URL}/barrios`, newBarrio);
}
