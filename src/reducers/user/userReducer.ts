export interface UserState {
  // Defining the shape of  user state
  id: string;
  username: string;
}

export function userReducer(
  state: UserState = { id: "", username: "" },
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
}
