import { fetchTasks, saveLocalTasksToDB } from "../todo/todo-actions";

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
  localStorage.removeItem("token");
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
  await dispatch(signUp(user));
  if (autoLogin) {
    await dispatch(saveLocalTasksToDB());
    await dispatch(fetchTasks());
  }
};

export const signInProcess = (data) => async (dispatch) => {
  await dispatch(signIn(data));
  await dispatch(fetchUserData());
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

// их объединить
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const fetchUserData = () => ({
  type: FETCH_USER_DATA,
  request: {
    url: `/user/`,
    method: "get"
  },
  meta: { asPromise: true }
});

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => ({
  type: FETCH_USERS,
  request: {
    url: `/user`,
    method: "get"
  }
});