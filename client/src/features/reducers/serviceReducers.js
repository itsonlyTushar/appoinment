import { SERVICES_FAIL, SERVICES_REQ, SERVICES_SUC } from "../keyFactory";

const initialState = {
  services: [],
  totalPages: 1,
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

    case SERVICES_SUC: {
      const isArray = Array.isArray(action.payload);
      const servicesList = isArray
        ? action.payload
        : action.payload?.services || [];
      const totalPages = isArray ? 1 : (action.payload?.totalPages ?? 1);

      return {
        ...state,
        loading: false,
        success: true,
        services: servicesList,
        totalPages,
        error: null,
      };
    }

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
