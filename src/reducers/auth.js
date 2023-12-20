const initialState = {
  name: "",
  email: "",
  token: "",
  role: "",
  notify_links: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    case "SIGN_OUT_SUCCESS":
      return initialState;
    default:
      return state;
  }
}
