import JwtDecode from "jwt-decode";
import _has from "lodash/fp/has";

export const checkResponseOnToken = (response) => {
  const isToken =
    _has("data", response) && _has("token", JSON.parse(response.data));
  return isToken && JSON.parse(response.data).token;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserIdFromToken = () => {
  const { id } = JwtDecode(localStorage.getItem("token"));
  return id;
};
