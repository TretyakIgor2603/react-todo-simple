import * as authActions from "./actions";
import { success } from "redux-saga-requests";

const initialState = {
  users: [],
  user: {},
  existEmail: false,
  isError: false,
  errors: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(authActions.FETCH_USERS):
      return {
        ...state,
        users: action.data.users
      };
    case success(authActions.SIGN_UP):
      return {
        ...state,
        user: action.data
      };
    case success(authActions.SIGN_IN):
      console.log(action.data)
      localStorage.setItem('token', action.data.token);
      return {...state}
      
    default:
      return state;
  }
};

export default authReducer;
