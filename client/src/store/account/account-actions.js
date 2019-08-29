import { getUserIdFromToken, removeToken } from "../../utils/token";
import { clearAllTasks, fetchTasks } from "../todo/todo-db-actions";
import { saveLocalTasksToDB } from "../todo/todo-local-actions";

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

export const signOutProcess = () => async (dispatch) => {
  await dispatch(signOut());
  await dispatch(clearAllTasks());
  removeToken();
};

export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => {
  removeToken();
  return {
    type: CLEAR_AUTH
  };
};

export const signUpProcess = (user, autoLogin = false) => async (dispatch) => {
  await dispatch(signUp(user));
  if (autoLogin) {
    await dispatch(saveLocalTasksToDB());
    await dispatch(fetchTasks());
  }
};

export const signInProcess = (formData) => async (dispatch, getState) => {
  const localTasks = getState().todo.tasks;
  await dispatch(signIn(formData));
  await dispatch(fetchUsers(getUserIdFromToken()));
  if (localTasks.length) {
    await dispatch(saveLocalTasksToDB(localTasks));
  }
};

export const SET_STATUS_AUTHORIZED = "SET_STATUS_AUTHORIZED";
export const setAuthorized = () => {
  return { type: SET_STATUS_AUTHORIZED, meta: { asPromise: true } };
};

export const CHECK_EXIST_EMAIL = "CHECK_EXIST_EMAIL";
export const checkExistEmail = (email) => ({
  type: CHECK_EXIST_EMAIL,
  request: {
    url: `/auth/email-exist`,
    method: "post",
    data: { email }
  },
  meta: { asPromise: true }
});

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = (userId) => ({
  type: FETCH_USERS,
  request: {
    url: `/users/${userId}`,
    method: "get"
  },
  meta: { asPromise: true }
});
