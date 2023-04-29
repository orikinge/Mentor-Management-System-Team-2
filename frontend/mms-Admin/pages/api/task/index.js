import http from "services/axios";

export const fetchTasks = async (query) => {
  const url = "/task";
  return await http.get(url);
};
