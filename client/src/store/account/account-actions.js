import {
  getUserIdFromToken,
  removeTokenFromLocalStorage
} from "../../utils/token";
import { clearAllTasks } from "../todo/todo-db-actions";
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
  removeTokenFromLocalStorage();
};

export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => {
  removeTokenFromLocalStorage();
  return {
    type: CLEAR_AUTH
  };
};

export const signUpProcess = (user, autoLogin = false) => async (dispatch) => {
  await dispatch(signUp(user));
  if (autoLogin) {
    await dispatch(saveLocalTasksToDB());
  }
};

export const signInProcess = (formData) => async (dispatch, getState) => {
  await dispatch(signIn(formData));
  await dispatch(fetchUser(getUserIdFromToken()));
  await dispatch(saveLocalTasksToDB());
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

export const FETCH_USER = "FETCH_USER";
export const fetchUser = (userId) => ({
  type: FETCH_USER,
  request: {
    url: `/users/${userId}`,
    method: "get"
  }
});

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => ({
  type: FETCH_USERS,
  request: {
    url: `/users/`,
    method: "get"
  }
});

export const FETCH_USERS_ROLES = "FETCH_USERS_ROLES";
export const fetchUsersRoles = () => ({
  type: FETCH_USERS_ROLES,
  request: {
    url: `/users/roles/`,
    method: "get"
  }
});

export const REMOVE_USER = "REMOVE_USER";
export const removeUser = (userId) => ({
  type: REMOVE_USER,
  request: {
    url: `/users/${userId}`,
    method: "delete"
  },
  meta: { asPromise: true }
});

export const removeUserAndFetchUsers = (userId) => async (dispatch, getState) => {
  await dispatch(removeUser(userId));
  await dispatch(fetchUsers())
};

