import { fetchTasks } from "../todo/todo-actions";
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
};

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => ({
  type: SIGN_OUT,
  request: {
    url: `/auth/logout`,
    method: "post",
    headers: {
      Authorization: getToken()
    }
  },
  meta: { asPromise: true }
});

export const CHECK_EXIST_EMAIL = "CHECK_EXIST_EMAIL";
export const checkExistEmail = (email) => ({
  type: CHECK_EXIST_EMAIL,
  request: {
    url: `/auth/user-exist`,
    method: "post",
    data: { email }
  }
});

export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = () => {
	const token = getToken();
	
	// проверить на токен, если он ОК, то вызвать еще один экшн с user-actions,
	// который примет токен и запросит пользователя и обновит пользователя

  if (token) {
    return {
      type: CHECK_TOKEN,
      request: {
        url: `/auth/check-token`,
        method: "get",
        headers: {
          Authorization: token
        }
      },
      meta: { token }
    };
  } else {
    return {
      type: CHECK_TOKEN
    };
  }
};

export const checkLogged = () => async (dispatch) => {
  await dispatch(checkToken());
  await dispatch(fetchUserData());
};


export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => ({
  type: FETCH_USERS,
  request: {
    url: `/user`,
    method: "get",
    headers: {
      Authorization: getToken()
    }
  }
});

export const signOutAndLogout = () => async (dispatch) => {
  await dispatch(signOut());
  removeToken();
};

export const setToken = () => async (dispatch, getState) => {
  localStorage.setItem("token", JSON.stringify(getState().auth.token));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token")) || null;
};
