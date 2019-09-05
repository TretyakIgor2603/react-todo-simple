import * as accountActions from "./account-actions";
import { success } from "redux-saga-requests";

const initialState = {
  user: {},
  users: [],
  userRoles: null,
  userName: null,
  isLogout: false,
  isAuthorized: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(accountActions.FETCH_USERS_ROLES):
      return {
        ...state,
        userRoles: action.data.roles
      };

    case success(accountActions.SIGN_IN):
      return {
        ...state,
        isAuthorized: true,
        userName: action.data.userName
      };

    case success(accountActions.SIGN_UP):
      const { data } = action
      return {
        ...state,
        userName: data.user.username,
        isAuthorized: data.accessToken && data.refreshToken ? true : false
      };
    
    case accountActions.CLEAR_AUTH:
    case success(accountActions.SIGN_OUT):
      return {
        ...state,
        userName: null,
        isAuthorized: false,
        isLogout: true
			};
			
    case success(accountActions.FETCH_CURRENT_USER):
      return {
        ...state,
        user: action.data.user
      };
      
    case success(accountActions.FETCH_ALL_USERS):
      return {
        ...state,
        users: action.data.users
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
