import axios from "axios";
import {
  ADD_NOTES_REQUEST,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_FAILURE,
  SET_PROPERTY_NOTES_REQUEST,
  SET_PROPERTY_NOTES_SUCCESS,
  SET_PROPERTY_NOTES_FAILURE,
} from "./actionTypes";

// Action Add sticky note
export const addStickyNote = (data) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: ADD_NOTES_REQUEST });

      // Send the API request to add property
      const response = await axios.post(
        "https://rs-backend.onrender.com/api/stickynotes/add",
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: ADD_NOTES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: ADD_NOTES_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};

// Action for getting stored properties
export const fetchStickyNoteByProperty = (data) => {
  return async (dispatch) => {
    try {
      // Dispatch the register request action
      dispatch({ type: SET_PROPERTY_NOTES_REQUEST });

      // Send the API request to fetch property
      const response = await axios.get(
        `https://rs-backend.onrender.com/api/stickynotes/propertyStickyNotes`,
        data
      );

      // Dispatch the register success action with the response data
      dispatch({
        type: SET_PROPERTY_NOTES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch the register failure action with the error message
      console.log("*error: ", error);
      dispatch({
        type: SET_PROPERTY_NOTES_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
