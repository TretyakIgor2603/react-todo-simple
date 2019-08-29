import JwtDecode from "jwt-decode";

export const setTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || null;
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getUserIdFromToken = () => {
  const { id } = JwtDecode(localStorage.getItem("token"));
  return id;
};
