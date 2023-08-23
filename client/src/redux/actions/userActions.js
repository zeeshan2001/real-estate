import axios from "axios";

import {
  SET_ADD_USER_FAILURE,
  SET_ADD_USER_REQUEST,
  SET_ADD_USER_SUCCESS,
  SET_UPDATE_USER_FAILURE,
  SET_UPDATE_USER_REQUEST,
  SET_UPDATE_USER_SUCCESS,
  SET_USERS_FAILURE,
  SET_USERS_REQUEST,
  SET_USERS_SUCCESS,
  SET_DELETE_USER_FAILURE,
  SET_DELETE_USER_REQUEST,
  SET_DELETE_USER_SUCCESS,
} from "./actionTypes";
import { ROOT_API_URL } from "../../constants/common";

// Action for getting existing users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_USERS_REQUEST });
      // Send the API request to fetch users
      const response = await axios.get("${ROOT_API_URL}/api/users");
      dispatch({
        type: SET_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: SET_USERS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action Creator for registering a user
export const addUser = (user, onSuccessCallback = null) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: SET_ADD_USER_REQUEST });

      // Send the API request to create the user
      const response = await axios.post(
        `${ROOT_API_URL}${ROOT_API_URL}/api/auth/addUser`,
        user
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: SET_ADD_USER_SUCCESS,
        payload: response.data,
      });
      if (onSuccessCallback && onSuccessCallback instanceof Function) {
        onSuccessCallback(response.data);
      }
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: SET_ADD_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for update user
export const updateUser = (data, onSuccessCallback = null) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_UPDATE_USER_REQUEST });
      const response = await axios.put(`${ROOT_API_URL}/users/update`, data);
      dispatch({
        type: SET_UPDATE_USER_SUCCESS,
        payload: response.data,
      });
      if (onSuccessCallback && onSuccessCallback instanceof Function) {
        onSuccessCallback(response.data);
      }
    } catch (error) {
      console.log("*error: ", error);
      dispatch({
        type: SET_UPDATE_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for deleting a user
export const deleteUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_DELETE_USER_REQUEST });
      // Send the API request to DELETE user
      const response = await axios.delete(
        `${ROOT_API_URL}/api/users/delete`,
        data
      );
      dispatch({
        type: SET_DELETE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("*error: ", error);
      dispatch({
        type: SET_DELETE_USER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
