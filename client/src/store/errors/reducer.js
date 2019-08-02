import * as errorActions from "./actions";

const initialState = {
  errors: []
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorActions.SET_ERROR:
      console.log('ya TYT')
      console.log(action.payload.errors)
      return {
        errors: action.payload.errors
      };
    default:
      if (action.type.indexOf("ERROR") === -1) return state;
      const { data } = action.error.response;
      if (data.tokenExpiredError) localStorage.removeItem("token");
      return { errors: data };
  }
};

export default errorsReducer;
