import * as errorActions from "./actions";

const initialState = {
  errors: []
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorActions.SET_ERROR:
      return {
				...state,
        errors: action.payload.errors
      };
    default:
      if (action.type.indexOf("ERROR") === -1) return state;
      const { data } = action.error.response;
      if (data.tokenExpiredError || !data.validToken) localStorage.removeItem("token");
      return { ...state, errors: data };
  }
};

export default errorsReducer;
