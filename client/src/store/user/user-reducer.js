import * as userActions from "./user-actions";
import { success } from "redux-saga-requests";

const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case success(userActions.FETCH_USER_DATA):
      return {
        ...state,
        user: action.data
      };

    default:
      return state;
  }
};

export default userReducer;
