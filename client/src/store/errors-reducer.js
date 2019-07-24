const initialState = {
  errors: []
};

const errorsReducer = (state = initialState, action) => {
  if (action.type.indexOf("ERROR") === -1) return state;
  return { errors: action.error.response.data };
};

export default errorsReducer;
