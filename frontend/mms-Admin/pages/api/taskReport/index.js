import http from "services/axios";

export const fetchTaskReports = async () => {
  const url = "/task-reports";
  return await http.get(url);
};
