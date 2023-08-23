import axios from "axios";

import {
  ADD_PROPERTY_FAILURE,
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILURE,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  FETCH_PROPERTY_REQUEST,
  FETCH_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  SET_DASHBOARD_DATA_FAILURE,
  SET_DASHBOARD_DATA_REQUEST,
  SET_DASHBOARD_DATA_SUCCESS,
  SET_MULTI_TAB_DATA_FAILURE,
  SET_MULTI_TAB_DATA_REQUEST,
  SET_MULTI_TAB_DATA_SUCCESS,
  SET_SELECTED_PROPERTIES,
} from "./actionTypes";
import { ROOT_API_URL } from "../../constants/common";

// Action Add Property for adding a property
export const addProperty = (data, onSuccessCallback = null) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: ADD_PROPERTY_REQUEST });

      // Send the API request to add property
      const response = await axios.post(`${ROOT_API_URL}/property/add`, data);

      // Dispatch the register success action with the response data
      dispatch({
        type: ADD_PROPERTY_SUCCESS,
        payload: response.data,
      });
      if (onSuccessCallback && onSuccessCallback instanceof Function) {
        onSuccessCallback(response.data);
      }
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: ADD_PROPERTY_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action Add Property for adding a property
export const updateProperty = (id, data, onSuccessCallback = null) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: UPDATE_PROPERTY_REQUEST });

      // Send the API request to UPDATE property
      const response = await axios.put(
        `${ROOT_API_URL}/property/update/${id}`,
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: UPDATE_PROPERTY_SUCCESS,
        payload: response.data,
      });
      if (onSuccessCallback && onSuccessCallback instanceof Function) {
        onSuccessCallback(response.data);
      }
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: UPDATE_PROPERTY_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for getting stored properties
export const fetchProperties = () => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: FETCH_PROPERTIES_REQUEST });

      // Send the API request to fetch properties
      const response = await axios.get(`${ROOT_API_URL}/property/getAll`);

      // Dispatch the register success action with the response data
      dispatch({
        type: FETCH_PROPERTIES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: FETCH_PROPERTIES_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for getting stored properties
export const fetchProperty = (propertyId) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: FETCH_PROPERTY_REQUEST });

      // Send the API request to fetch property
      const response = await axios.get(
        `${ROOT_API_URL}/property/${propertyId}`
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: FETCH_PROPERTY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: FETCH_PROPERTY_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for getting stored properties
export const fetchDashboardData = (data) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: SET_DASHBOARD_DATA_REQUEST });

      // Send the API request to fetch property
      const response = await axios.get(
        `${ROOT_API_URL}/property/dashboard/data`,
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: SET_DASHBOARD_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: SET_DASHBOARD_DATA_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for data for multi tab on dashboard
export const fetchMultiTabData = (data) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: SET_MULTI_TAB_DATA_REQUEST });

      // Send the API request to fetch property
      const response = await axios.post(
        `${ROOT_API_URL}/property/dashboard/multi`,
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: SET_MULTI_TAB_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: SET_MULTI_TAB_DATA_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for deleting a property
export const deleteProperty = (data) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: DELETE_PROPERTY_REQUEST });

      // Send the API request to DELETE property
      const response = await axios.delete(
        `${ROOT_API_URL}/property/delete`,
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: DELETE_PROPERTY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: DELETE_PROPERTY_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for selected properties
export const selectProperties = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SELECTED_PROPERTIES,
      payload: data,
    });
  };
};
