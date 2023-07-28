import {
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILURE,
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTIES_FAILURE,
  FETCH_PROPERTY_REQUEST,
  FETCH_PROPERTY_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  SET_DASHBOARD_DATA_REQUEST,
  SET_DASHBOARD_DATA_SUCCESS,
  SET_DASHBOARD_DATA_FAILURE,
  SET_MULTI_TAB_DATA_REQUEST,
  SET_MULTI_TAB_DATA_SUCCESS,
  SET_MULTI_TAB_DATA_FAILURE,
  SET_SELECTED_PROPERTIES,
} from "../actions/actionTypes";

// Initial state for property
const initialState = {
  lastAddedProperty: null,
  fetchedProperty: null,
  updatedProperty: null,
  portfolio: null,
  existingProperties: [],
  multiTabData: null,
  selectedProperties: [],
  properties: [],
  propertyChartData: [],
  financialChartData: [],
  loading: false,
  error: null,
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROPERTIES_SUCCESS:
      return {
        ...state,
        properties: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        fetchedProperty: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PROPERTY_SUCCESS:
      return {
        ...state,
        lastAddedProperty: action.payload,
        loading: false,
        error: null,
      };
    case ADD_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        updatedProperty: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: action.payload?.properties
          ? action.payload?.properties
          : state.properties,
        loading: false,
        error: null,
      };
    case DELETE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        portfolio: action.payload?.portfolio[0],
        propertyChartData: action.payload?.propertyChartData,
        financialChartData: action.payload?.financialChartData,
        existingProperties: action.payload?.existingProperties,
        loading: false,
        error: null,
      };
    case SET_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_MULTI_TAB_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_MULTI_TAB_DATA_SUCCESS:
      return {
        ...state,
        multiTabData: action.payload.length > 0 ? action.payload[0] : null,
        loading: false,
        error: null,
      };
    case SET_MULTI_TAB_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SELECTED_PROPERTIES:
      return {
        ...state,
        selectedProperties: action.payload,
      };
    default:
      return state;
  }
};

export default propertyReducer;
