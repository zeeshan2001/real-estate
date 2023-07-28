import { getUser } from "../../utils/services";
import {
  ADD_NOTES_REQUEST,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_FAILURE,
  SET_PROPERTY_NOTES_REQUEST,
  SET_PROPERTY_NOTES_SUCCESS,
  SET_PROPERTY_NOTES_FAILURE,
} from "../actions/actionTypes";

// Initial state for sticky notes
const initialState = {
  notes: [],
  propertyStickNotes: [], // holds data of sticky notes associated with a specific property
  loading: false,
  error: null,
};

const stickynotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_NOTES_SUCCESS:
      return {
        ...state,
        propertyStickNotes: [
          ...state.propertyStickNotes,
          { ...action.payload, userId: { username: getUser().username } },
        ],
        loading: false,
        error: null,
      };
    case ADD_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_PROPERTY_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_PROPERTY_NOTES_SUCCESS:
      return {
        ...state,
        propertyStickNotes: action.payload,
        loading: false,
        error: null,
      };
    case SET_PROPERTY_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stickynotesReducer;
