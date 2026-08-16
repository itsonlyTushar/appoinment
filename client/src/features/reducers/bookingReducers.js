import {
  NEW_BOOKING_FAIL,
  NEW_BOOKING_REQ,
  NEW_BOOKING_SUC,
} from "../keyFactory";

// INITIAL STATE
const initialState = {
  booking: null,
  loading: false,
  error: null,
  success: false,
};

// REDUCER : BOOKING REDUCER
export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_BOOKING_REQ:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case NEW_BOOKING_SUC:
      return {
        ...state,
        loading: false,
        success: true,
        booking: action.payload,
        error: null,
      };

    case NEW_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
