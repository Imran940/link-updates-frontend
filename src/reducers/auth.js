const initialState = {
  name: "",
  email: "",
  token: "",
  role: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        ...action.payload,
      };

    case "SIGN_OUT_SUCCESS":
      return initialState;
    default:
      return state;
  }
}
