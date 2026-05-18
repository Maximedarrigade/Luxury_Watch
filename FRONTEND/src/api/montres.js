import api from "./axios.js";

export const getMontres = async () => {
  const res = await api.get("/montres");

  return res.data;
};
