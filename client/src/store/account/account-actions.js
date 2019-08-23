import { fetchTasks, saveLocalTasksToDB } from "../todo/todo-actions";
import { setToken, getUserIdFromToken } from "../../utils/token";

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

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => {
  return {
    type: SIGN_OUT,
    request: {
      url: `/auth/logout`,
      method: "post"
    },
    meta: { asPromise: true }
  };
};

export const signUpProcess = (user, autoLogin = false) => async (dispatch) => {
  const { data } = await dispatch(signUp(user));
  if (autoLogin) {
    await setToken(data);
    await dispatch(saveLocalTasksToDB());
    await dispatch(fetchTasks());
  }
};

export const signInProcess = (formData) => async (dispatch) => {
  const { data } = await dispatch(signIn(formData));
  await setToken(data);
  console.log('success token')
  await dispatch(fetchUsers(getUserIdFromToken()));
  await dispatch(saveLocalTasksToDB());
};

export const SET_STATUS_AUTHORIZED = "SET_STATUS_AUTHORIZED";
export const checkAuthorized = () => {
  return { type: SET_STATUS_AUTHORIZED, meta: { asPromise: true } };
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

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = (userId) => ({
  type: FETCH_USERS,
  request: {
    url: `/user/${userId}`,
    method: "get"
  },
  meta: { asPromise: true }
});
