import { services as getServicesApi } from "../../api/service.api";
import {
  SERVICES_REQ,
  SERVICES_SUC,
  SERVICES_FAIL,
} from "../keyFactory";

// ACTION : GET ALL SERVICES
export const getAllServices = () => {
  return async (dispatch) => {
    dispatch({
      type: SERVICES_REQ,
    });

    try {
      const response = await getServicesApi();

      dispatch({
        type: SERVICES_SUC,
        payload: response.services || response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: SERVICES_FAIL,
        payload: errorMessage,
      });
      throw error;
    }
  };
};