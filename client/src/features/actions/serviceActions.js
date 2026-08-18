import { services as getServicesApi } from "../../api/service.api";
import {
  SERVICES_REQ,
  SERVICES_SUC,
  SERVICES_FAIL,
} from "../keyFactory";

// ACTION : GET ALL SERVICES
export const getAllServices = (params = {}) => {
  return async (dispatch) => {
    dispatch({
      type: SERVICES_REQ,
    });

    try {
      const response = await getServicesApi(params);

      dispatch({
        type: SERVICES_SUC,
        payload: response,
      });
      return response;
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      dispatch({
        type: SERVICES_FAIL,
        payload: errorMessage,
      });
      throw err;
    }
  };
};