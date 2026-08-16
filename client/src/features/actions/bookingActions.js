import { bookingUser } from "../../api/booking.api";
import {
  NEW_BOOKING_FAIL,
  NEW_BOOKING_REQ,
  NEW_BOOKING_SUC,
} from "../keyFactory";

export const newBooking = (data) => {
  return async (dispatch) => {
    dispatch({
      type: NEW_BOOKING_REQ,
    });

    try {
      const response = await bookingUser(data);

      dispatch({
        type: NEW_BOOKING_SUC,
        payload: response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: NEW_BOOKING_FAIL,
        payload: errorMessage,
      });
      throw error;
    }
  };
};
