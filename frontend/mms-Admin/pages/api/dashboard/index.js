import http from "services/axios";

export const getDashboardData = async (query) => {
  const url = "/dashboard";
  return await http.get(url);
};
