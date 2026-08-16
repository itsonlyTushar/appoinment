import { api } from "../lib/axios";

export const services = async () => {
  const { data } = await api.get("/api/services/get-all");

  return data;
};
