import { api } from "../lib/axios";

/* SINGLE SOURCE OF THE TRUTH FOR CALLING BACK-END AUTHENTICATION APIS */

// WRAPPING THE REGISRATION API - POST
export const registerUser = async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);

  return data;
};

// WRAPPING THE GOOGLE REGISRATION API - POST
export const registerGoogle = async (payload) => {
  const { data } = await api.post("/api/auth/google", payload);
  return data;
};

// LOGIN API WRRAPPING INTO FUNCTION - POST
export const loginUser = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);

  return data;
};
