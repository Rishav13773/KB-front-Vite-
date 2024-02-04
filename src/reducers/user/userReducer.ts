import Cookies from "js-cookie";

export interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
  token: string;
  details: object;
  verified: boolean;
  phoneNo: number;
}

const initialState: UserState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user")!)
  : {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      picture: "",
      token: "",
      details: undefined,
      verified: false,
      phoneNo:null,
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
        email: "",
        username: "",
        picture: "",
        token: "",
        details: undefined,
        verified: false,
        phoneNo:null,
      };

    case "PROFILE":
      // Reset the user state when logging out
      return action.payload;

    default:
      return state;
  }
}
