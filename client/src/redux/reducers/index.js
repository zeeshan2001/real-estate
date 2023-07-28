import { combineReducers } from "redux";
import authReducer from "./authReducer";
import propertyReducer from "./propertyReducer";
import stickynotesReducer from "./stickynotesReducer";

export default combineReducers({
  auth: authReducer,
  property: propertyReducer,
  stickynotes: stickynotesReducer,
  // other reducers go here
});
