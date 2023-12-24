export function useReducer(
  state = [],
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
}
