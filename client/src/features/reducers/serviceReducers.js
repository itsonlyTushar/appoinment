import { SERVICES_FAIL, SERVICES_REQ, SERVICES_SUC } from "../keyFactory";

const initialState = {
  services: [],
  loading: false,
  error: null,
  success: false,
};

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICES_REQ:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case SERVICES_SUC:
      return {
        ...state,
        loading: false,
        success: true,
        services: action.payload,
        error: null,
      };

    case SERVICES_FAIL:
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
