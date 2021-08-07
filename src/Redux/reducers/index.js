import { combineReducers } from "redux";
import credentials from "./credential-reducer";
import TIMEReducer from "./dateLogin-reducer";

const rootReducer = combineReducers({
  credentials,
  TIMEReducer,
});

export default rootReducer;
