export interface UserState {
  // Defining the shape of  user state
  id: string;
  username: string;
  picture: string;
  token: string;
  details: object;
  verified: boolean;
}

export function userReducer(
  state: UserState = {
    id: "",
    username: "",
    picture: "",
    token: "",
    details: undefined,
    verified: false,
  },
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
