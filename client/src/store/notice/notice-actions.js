export const SET_MESSAGE = "SET_MESSAGE";
export const setMessage = ({
  message = {},
  type = "error",
  title = "Error!"
}) => {
  return {
    type: SET_MESSAGE,
    payload: {
      message: {message},
      type,
      title
    }
  };
};
