import Cookies from "js-cookie";

export interface UserState {
  id: string;
  username: string;
  picture: string;
  token: string;
  details: object;
  verified: boolean;
}

const initialState: UserState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user")!)
  : {
      id: "",
      username: "",
      picture: "",
      token: "",
      details: undefined,
      verified: false,
    };

export function userReducer(
  state: UserState = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case "REGISTER":
      return action.payload;

    case "LOGOUT":
      // Reset the user state when logging out
      return {
        id: "",
        username: "",
        picture: "",
        token: "",
        details: undefined,
        verified: false,
      };

    default:
      return state;
  }
}
