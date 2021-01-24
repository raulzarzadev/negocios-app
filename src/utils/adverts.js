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

export function getAdvert(id) {
  return axios.get(`${URL}/adverts/editar/${id}`);
}
export function getAdvertsByOwner(owner) {
  return axios.get(`${URL}/adverts/${owner}`);
}

export function getUserAdverts(user) {
  return axios.get(`${URL}/adverts/user/${user}`);
}

export function deleteAdvert(id) {
  return axios.delete(`${URL}/adverts/${id}`);
}
export function postAdvert(advert) {
  return axios.post(`${URL}/adverts`, { advert });
}

export function updateAdvert(id, advert) {
  return axios.put(`${URL}/adverts/editar/${id}`, {
    advert,
  });
}
export function getPublishedAdverts() {
  return axios.get(`${URL}/adverts`);
}
export function getAllAdverts() {
  return axios.get(`${URL}/adverts/all`);
}

export function getAdvertsByBarrio(barrio) {
  return axios.get(`${URL}/barrios/${barrio}`);
}

export function getAllBarrios() {
  return axios.get(`${URL}/barrios`);
}

export function getFavoriteAds(userId) {
  return axios.get(`${URL}/adverts/favorite/${userId}`);

  //encontrar todos {user:"#", savedAdverts:[{}]}
}

export function saveFavoriteAdvert(userId, advertId) {
  return axios.post(`${URL}/adverts/favorite/${userId}`, { advertId });
}

export function getFavoritesList(userId) {
  return axios.get(`${URL}/adverts/favoritesList/${userId}`);
}

export function deleteFavoriteAdvert(userId, advertId) {
  return axios.put(`${URL}/adverts/favorite/${userId}`, { advertId });
}
