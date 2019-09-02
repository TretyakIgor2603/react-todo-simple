import * as accountActions from "./account-actions";
import { success } from "redux-saga-requests";

const initialState = {
  user: {},
	users: [],
	userRoles: [],
  userName: null,
  isLogout: false,
  isAuthorized: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
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
        isAuthorized: data.token ? true : false
      };
    
    case accountActions.CLEAR_AUTH:
    case success(accountActions.SIGN_OUT):
      return {
        ...state,
        userName: null,
        isAuthorized: false,
        isLogout: true
			};
			
    case success(accountActions.FETCH_USER):
      return {
        ...state,
        user: action.data.user
      };
      
    case success(accountActions.FETCH_USERS):
      return {
        ...state,
        users: action.data.users
			};
			
    case success(accountActions.FETCH_USERS_ROLES):
      return {
        ...state,
        userRoles: action.data.roles
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
