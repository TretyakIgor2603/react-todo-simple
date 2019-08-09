export const setToken = (token) => localStorage.setItem("token", token);

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token")) || null;
};
