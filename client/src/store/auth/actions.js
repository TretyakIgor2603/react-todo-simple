export const SIGN_UP = "SIGN_UP";
export const signUp = (user) => {
  return {
    type: SIGN_UP,
    request: {
      url: `/auth/register`,
      method: "post",
      data: user
    },
    meta: {
      asPromise: true
    }
  };
};

export const signUpAndLogin = (user, autoLogin = false) => {
  return async (dispatch) => {
    await dispatch(signUp(user));
    autoLogin && (await dispatch(setToken()));
  };
};

export const SIGN_IN = "SIGN_IN";
export const signIn = (data) => {
  return {
    type: SIGN_IN,
    request: {
      url: `/auth/login`,
      method: "post",
      data
    },
    meta: {
      asPromise: true
    }
  };
};

export const signInAndLogin = (data) => {
  return async (dispatch) => {
    await dispatch(signIn(data));
    await dispatch(setToken());
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => {
  removeToken()
  return {
    type: SIGN_OUT,
    request: {
      url: `/auth/logout`,
      method: "post",
      headers: {
        Authorization: getToken()
      }
    },
    meta: {
      asPromise: true
    }
  };
};

export const CHECK_EXIST_EMAIL = "CHECK_EXIST_EMAIL";
export const checkExistEmail = (email) => {
  return {
    type: CHECK_EXIST_EMAIL,
    request: {
      url: `/auth/user-exist`,
      method: "post",
      data: { email }
    },
    meta: {
      asPromise: true
    }
  };
};

export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = () => {
  const token = getToken();
  const checkRequest = {
    type: CHECK_TOKEN,
    request: {
      url: `/auth/check-token`,
      method: "get"
    },
    meta: {
      token
    }
  };
  if (token) checkRequest.request.headers = { Authorization: token };
  return checkRequest;
};

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
    request: {
      url: `/user`,
      method: "get",
      headers: {
        Authorization: getToken()
      }
    }
  };
};

export const signOutAndLogout = () => {
  return async (dispatch) => {
    await dispatch(signOut());
    await dispatch(removeToken());
  };
};

export const setToken = () => {
  return async (dispatch, getState) => {
    localStorage.setItem("token", getState().auth.token);
  };
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};
