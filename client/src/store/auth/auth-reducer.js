import * as authActions from "./auth-actions";
import { success } from "redux-saga-requests";

const initialState = {
  users: [],
  existEmail: false,
  userName: null,
  token: null,
  statusText: null,
  isError: false,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(authActions.CHECK_TOKEN):
      return {
        ...state,
        token: action.meta.token,
        isAuthenticated: true
      };

    case success(authActions.FETCH_USERS):
      return {
        ...state,
        users: action.data.users
      };

    case success(authActions.SIGN_UP):
      return {
        ...state,
        userName: action.data.user.nickname,
        token: action.data.token ? action.data.token : null,
        isAuthenticated: action.data.token ? true : false
      };

    case success(authActions.SIGN_IN):
      return {
        ...state,
        isAuthenticated: true,
        token: action.data.token,
        userName: action.data.userName,
        statusText: "You have been successfully logged in."
      };
    case success(authActions.SIGN_OUT):
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: "You have been successfully logged out."
      };

    default:
      return state;
  }
};

export default authReducer;