import { combineReducers } from "redux";
import { userReducer, UserState } from "./user/userReducer";

// Defining the RootState type
export interface RootState {
  user: UserState;
}

const rootReducer = combineReducers({
  user: userReducer,

  // projects: projectReducer,
  // loader: loaderReducer,
});

export default rootReducer;
