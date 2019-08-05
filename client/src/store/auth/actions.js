export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = () => {
  const token = localStorage.getItem("token");
	return {
		type: CHECK_TOKEN,
		request: {
			url: `/auth/check-token`,
			method: "get",
			headers: {
				Authorization: token
			}
		},
		meta: {
			token
		}
	};
};

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
    request: {
      url: `/user`,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
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

export const LOGOUT = "LOGOUT";
export const logout = (data) => {
  return {
    type: LOGOUT,
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
