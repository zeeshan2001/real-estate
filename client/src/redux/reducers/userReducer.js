import {
  SET_ADD_USER_REQUEST,
  SET_ADD_USER_SUCCESS,
  SET_ADD_USER_FAILURE,
  SET_UPDATE_USER_REQUEST,
  SET_UPDATE_USER_SUCCESS,
  SET_UPDATE_USER_FAILURE,
  SET_USERS_REQUEST,
  SET_USERS_SUCCESS,
  SET_USERS_FAILURE,
  SET_DELETE_USER_REQUEST,
  SET_DELETE_USER_SUCCESS,
  SET_DELETE_USER_FAILURE,
} from "../actions/actionTypes";

// Initial state for user
const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case SET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_ADD_USER_SUCCESS:
      return {
        ...state,
        users: manageUser("add", state.users, action.payload),
        loading: false,
        error: null,
      };
    case SET_ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: manageUser("update", state.users, action.payload),
        loading: false,
        error: null,
      };
    case SET_UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_DELETE_USER_SUCCESS:
      return {
        ...state,
        users: manageUser("delete", state.users, action.payload?.id),
        loading: false,
        error: null,
      };
    case SET_DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

function manageUser(action, users, record) {
  let usersClone = [...users];
  if (action === "add" && record) {
    usersClone.push(record);
  }
  if (action === "update" && record) {
    usersClone = users.map((user) => (user._id === record._id ? record : user));
  }
  if (action === "delete" && record) {
    usersClone = users.filter((user) => user._id !== record);
  }
  console.log(action, users, record, usersClone);
  return usersClone;
}
