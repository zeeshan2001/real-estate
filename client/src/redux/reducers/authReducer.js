// Import the action types
import { clearUser, getUser, setUser } from "../../utils/services";
import {
  SET_ADD_USER_REQUEST,
  SET_ADD_USER_SUCCESS,
  SET_ADD_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from "../actions/actionTypes";

const storedUser = getUser();

// Initial state for auth
const initialState = {
  user: storedUser || null,
  newUser: null,
  isLoggedIn: storedUser?.isLoggedIn || false,
  loading: false,
  error: null,
};

// Auth reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        newUser: action.payload,
        error: null,
      };
    case SET_ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      if (action.payload) setUser({ ...action.payload, isLoggedIn: true });
      return {
        ...state,
        user: action.payload,
        loading: false,
        isLoggedIn: true,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      clearUser();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
