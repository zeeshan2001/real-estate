import { combineReducers } from "redux";
import authReducer from "./authReducer";
import propertyReducer from "./propertyReducer";
import userReducer from "./userReducer";
import stickynotesReducer from "./stickynotesReducer";

export default combineReducers({
  auth: authReducer,
  users: userReducer,
  property: propertyReducer,
  stickynotes: stickynotesReducer,
  // other reducers go here
});
