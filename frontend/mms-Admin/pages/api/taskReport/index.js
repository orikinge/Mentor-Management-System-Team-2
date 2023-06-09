import http from "services/axios";

export const fetchTaskReports = async () => {
  const response = await http.get("/task-reports");
  return response.data.responseData;
};
