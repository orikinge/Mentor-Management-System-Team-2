import http from "services/axios";

export const getDashboardData = async (query) => {
  const response = await http.get("/dashboard");
  return response.data;
};
