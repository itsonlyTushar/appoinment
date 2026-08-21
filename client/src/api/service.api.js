import { api } from "../lib/axios";

/* SINGLE SOURCE OF THE TRUTH FOR CALLING BACK-END SERVICE API */

// GET ALL SERVICE - GET
export const services = async (params = {}) => {
  const { data } = await api.get("/api/services/get-all", { params });

  return data;
};
