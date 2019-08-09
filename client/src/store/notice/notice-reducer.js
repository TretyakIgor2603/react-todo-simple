import * as noticeActions from "./notice-actions";
import { signOut } from "../account/account-actions";

const initialState = {
  type: "error",
  title: "Error!",
  messages: []
};

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case noticeActions.SET_MESSAGE:
      const { type, title, message } = action.payload;
      return {
        ...state,
        type,
        title,
        messages: [message]
      };
    default:
      if (action.type.indexOf("ERROR") === -1) return state;
      const { data } = action.error.response;
      if (data.tokenExpiredError || !data.validToken) signOut();
      return { ...state, messages: [data] };
  }
};

export default noticeReducer;
