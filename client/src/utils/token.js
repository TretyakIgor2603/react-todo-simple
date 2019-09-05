import JwtDecode from "jwt-decode";

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken") || null;
};

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getUserIdFromToken = () => {
  const { id } = JwtDecode(getAccessTokenFromLocalStorage());
  return id;
};
