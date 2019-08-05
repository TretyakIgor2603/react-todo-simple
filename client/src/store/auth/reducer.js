import * as authActions from "./actions";
import { success } from "redux-saga-requests";

const initialState = {
	users: [],
  existEmail: false,
	userName: null,
	token: null,
	statusText: null,

	isError: false,
	isAuthenticated: false,
	isAuthenticating: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(authActions.CHECK_TOKEN):
      return {
        ...state,
        token: action.meta.token
			};

    case success(authActions.FETCH_USERS):
      return {
        ...state,
        users: action.data.users
			};
			
    case success(authActions.SIGN_UP):
			console.log(action.data)
      return {
        ...state,
        userName: action.data.user.nickname,
				token: action.data.token ? action.data.token : null,
				isAuthenticated: action.data.token ? true : false
			};
			
    case success(authActions.SIGN_IN):
      console.log(action.data);
      localStorage.setItem("token", action.data.token);
			return { 
				...state,
				isAuthenticating: false,
				isAuthenticated: true,
				token: action.data.token,
				userName: action.data.userName,
				statusText: 'You have been successfully logged in.'
			 };
    case success(authActions.LOGOUT):
      localStorage.removeItem("token");
			return { 
				...state,
				isAuthenticated: false,
				token: null,
				userName: null,
				statusText: 'You have been successfully logged out.'
			 };

    default:
      return state;
  }
};

export default authReducer;
