import JwtDecode from "jwt-decode";

export const setToken = ({ token }) => {
  return new Promise((resolve, reject) => {
    token && localStorage.setItem("token", token);
    resolve("Token has been success added to local storage!");
  });
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getUserIdFromToken = () => {
  const { id } = JwtDecode(localStorage.getItem("token"));
  return id;
};