import { fetchTasks, saveLocalTasksToDB } from "../todo/todo-actions";
import { fetchUserData } from "../user/user-actions";

export const SIGN_UP = "SIGN_UP";
export const signUp = (user) => ({
  type: SIGN_UP,
  request: {
    url: `/auth/register`,
    method: "post",
    data: user
  },
  meta: { asPromise: true }
});

export const signUpAndLogin = (user, autoLogin = false) => async (dispatch) => {
  await dispatch(signUp(user));
  if (autoLogin) {
    await dispatch(setToken());
		await dispatch(saveLocalTasksToDB());
		await dispatch(fetchTasks());
  }
};

export const SIGN_IN = "SIGN_IN";
export const signIn = (data) => ({
  type: SIGN_IN,
  request: {
    url: `/auth/login`,
    method: "post",
    data
  },
  meta: { asPromise: true }
});

export const signInAndLogin = (data) => async (dispatch) => {
  await dispatch(signIn(data));
  await dispatch(setToken());
  await dispatch(fetchUserData());
  await dispatch(saveLocalTasksToDB());
};

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => (dispatch, getState) => {
  return dispatch({
    type: SIGN_OUT,
    request: {
      url: `/auth/logout`,
      method: "post",
      headers: {
        Authorization: getState().auth.token
      }
    },
    meta: { asPromise: true }
  });
};

export const CHECK_EXIST_EMAIL = "CHECK_EXIST_EMAIL";
export const checkExistEmail = (email) => ({
  type: CHECK_EXIST_EMAIL,
  request: {
    url: `/auth/user-exist`,
    method: "post",
    data: { email }
  },
  meta: { asPromise: true }
});

export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = (token) => {
  return {
    type: CHECK_TOKEN,
    request: {
      url: `/auth/check-token`,
      method: "get",
      headers: {
        Authorization: token
      }
    },
    meta: { token, asPromise: true }
  };
};

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_USERS,
    request: {
      url: `/user`,
      method: "get",
      headers: {
        Authorization: getState().auth.token
      }
    }
  });
};

export const signOutAndLogout = () => async (dispatch, getState) => {
  if (getState().auth.token) {
    await dispatch(signOut());
    removeToken();
  }
};

export const checkLogged = () => async (dispatch) => {
  const token = getToken();
  if (token) {
    await dispatch(checkToken(token));
    await dispatch(fetchUserData());
  }
};

export const setToken = () => async (dispatch, getState) => {
  localStorage.setItem("token", JSON.stringify(getState().auth.token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token")) || null;
};

export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const removeToken = () => {
  localStorage.removeItem("token");
};
