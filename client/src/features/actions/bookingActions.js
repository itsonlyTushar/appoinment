import { bookingUser, getUserBookings, getBookingYears } from "../../api/booking.api";
import { BOOKING_FAIL, BOOKING_REQ, BOOKING_SUC, YEARS_REQ, YEARS_SUC, YEARS_FAIL } from "../keyFactory";

// ACTION : CREATE NEW BOOKING
export const newBooking = (data) => {
  return async (dispatch) => {
    dispatch({
      type: BOOKING_REQ,
    });

    try {
      const response = await bookingUser(data);

      dispatch({
        type: BOOKING_SUC,
        payload: response,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BOOKING_FAIL,
        payload: errorMessage,
      });
      throw error;
    }
  };
};

// ACTION : GET PREVIOUS BOOKINGS
export const getAllBookings = (year) => {
  return async (dispatch) => {
    dispatch({
      type: BOOKING_REQ,
    });
    try {
      const response = await getUserBookings(year);

      dispatch({
        type: BOOKING_SUC,
        payload: response.bookings || response,
      });
      return response;
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      dispatch({
        type: BOOKING_FAIL,
        payload: errorMessage,
      });
      throw err
    }
  };
};

// ACTION : GET BOOKING YEARS
export const fetchBookingYears = () => {
  return async (dispatch) => {
    dispatch({
      type: YEARS_REQ,
    });
    try {
      const response = await getBookingYears();

      dispatch({
        type: YEARS_SUC,
        payload: response.years || [],
      });
      return response;
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      dispatch({
        type: YEARS_FAIL,
        payload: errorMessage,
      });
      throw err;
    }
  };
};
