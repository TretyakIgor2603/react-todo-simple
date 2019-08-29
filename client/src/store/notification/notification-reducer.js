import * as noticeActions from "./notification-actions";
import _get from "lodash/fp/get";

const initialState = {
  type: "error",
  title: "Error!",
  messages: []
};

const notificationReducer = (state = initialState, action) => {
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
      const data = _get("error.response.data", action);
      return { ...state, messages: [data] };
  }
};

export default notificationReducer;
