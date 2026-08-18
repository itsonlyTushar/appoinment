import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  getUsersDetails as getUsersDetailsApi,
} from "../../api/auth.api";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../keyFactory";

// ACTION : USER REGISTRATION
export const userRegistration = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    try {
      const response = await registerUserApi(userData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: REGISTER_FAILURE,
        payload: errorMessage,
      });
      throw error;
    }
  };
};

// ACTION : USER LOGIN
export const userLogin = (credentials) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      const response = await loginUserApi(credentials);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: LOGIN_FAILURE,
        payload: errorMessage,
      });
      throw error;
    }
  };
};

// ACTION : USER LOGOUT
export const userLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
};

// ACTION : GET USER DETAILS
export const usersDetails = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      const response = await getUsersDetailsApi();

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: LOGIN_FAILURE,
        payload: errorMessage,
      });
      throw error;
    }
  };
};
