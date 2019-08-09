import * as accountActions from "./account-actions";
import { success } from "redux-saga-requests";

const initialState = {
  user: {},
  userName: null,
  isLogout: false,
  isAuthorized: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(accountActions.SIGN_IN):
      // куда вынести этот setItem? при выполнении reducer сразу обновляется todoPage и fetch-ит таски, без токена
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        isAuthorized: true,
        userName: action.data.userName
      };

    case success(accountActions.SIGN_UP):
      // куда вынести этот setItem? при выполнении reducer сразу обновляется todoPage и fetch-ит таски, без токена
      action.data.token && localStorage.setItem("token", action.data.token);
      return {
        ...state,
        userName: action.data.user.username,
        isAuthorized: action.data.token ? true : false
      };

    case success(accountActions.SIGN_OUT):
      return {
        ...state,
        userName: null,
        isAuthorized: false,
        isLogout: true
      };

    case success(accountActions.FETCH_USER_DATA):
      return {
        ...state,
        user: action.data
      };

    case accountActions.SET_STATUS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: true
      };

    default:
      return state;
  }
};

export default accountReducer;
