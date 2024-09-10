import axios from "axios";

export const getCurrentUser = async () => {
  const response = await axios.get("/api/current-user");
  return response.data;
};
