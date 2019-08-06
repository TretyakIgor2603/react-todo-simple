import { getToken } from "../auth/auth-actions";

export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const fetchUserData = () => {
  const token = getToken();
  if (token) {
    return {
      type: FETCH_USER_DATA,
      request: {
        url:  `/user/`,
        method: "get",
        headers: {
          Authorization: token
        }
      },
      meta: { token }
    };
  } else {
    return { type: FETCH_USER_DATA };
  }
};