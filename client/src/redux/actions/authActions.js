import axios from "axios";
import {
  SET_ADD_USER_FAILURE,
  SET_ADD_USER_REQUEST,
  SET_ADD_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "./actionTypes";

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

// Action Creator for user login
export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: LOGIN_USER_REQUEST });

      if (!user.username || !user.password) {
        throw new Error("Please fill in all the fields");
      }

      // Send the API login to login the user
      const response = await axios.post(
        "https://rs-backend.onrender.com/api/auth/login",
        user
      );

      // Dispatch the login success action with the response data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the login failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
