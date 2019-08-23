import JwtDecode from "jwt-decode";

export const setTokenToLocalStorage = ({ token }) => {
  return new Promise((resolve, reject) => {
    token && localStorage.setItem("token", token);
    resolve("Token has been success added to local storage!");
  });
};

export const getUserIdFromToken = () => {
  const { id } = JwtDecode(localStorage.getItem("token"));
  return id;
};
