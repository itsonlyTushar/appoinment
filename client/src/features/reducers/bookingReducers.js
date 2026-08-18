import {
  BOOKING_FAIL,
  BOOKING_REQ,
  BOOKING_SUC,
  YEARS_REQ,
  YEARS_SUC,
  YEARS_FAIL,
} from "../keyFactory";

// INITIAL STATE
const initialState = {
  booking: null,
  bookings: [],
  years: [],
  loading: false,
  yearsLoading: false,
  error: null,
  success: false,
};

// REDUCER : BOOKING REDUCER
export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_REQ:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case BOOKING_SUC:
      return {
        ...state,
        loading: false,
        success: true,
        bookings: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.bookings || state.bookings,
        booking: !Array.isArray(action.payload) ? action.payload : state.booking,
        error: null,
      };

    case BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case YEARS_REQ:
      return {
        ...state,
        yearsLoading: true,
      };

    case YEARS_SUC:
      return {
        ...state,
        yearsLoading: false,
        years: action.payload,
      };

    case YEARS_FAIL:
      return {
        ...state,
        yearsLoading: false,
      };

    default:
      return state;
  }
};
