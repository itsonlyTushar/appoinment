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

// GET CURRENT USER DETAILS - GET
export const getUsersDetails = async () => {
  const { data } = await api.get("/api/auth/me");

  return data;
};

// UPDATE USERS DETAILS - PATCH
export const updateUserProfile = async (payload) => {
  const { data } = await api.patch("/api/auth/update-me", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
