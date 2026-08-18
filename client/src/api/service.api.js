import { api } from "../lib/axios";

export const services = async (params = {}) => {
  const { data } = await api.get("/api/services/get-all", { params });

  return data;
};
