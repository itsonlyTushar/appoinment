import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  LOGOUT,
} from "../keyFactory";

// GET INITIAL USER FROM LOCAL-STORAGE IF EXISTS
const savedUser = (() => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

// SET INITIAL STATE
const initialState = {
  userInfo: savedUser,
  loading: false,
  error: null,
  success: false,
};

// REDUCER : AUTH REDUCER
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case PROFILE_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};
