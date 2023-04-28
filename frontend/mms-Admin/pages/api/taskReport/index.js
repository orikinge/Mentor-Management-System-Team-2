import Http from "../axios/axiosClient";

export const fetchTaskReports = async () => {
  const url = "/task-reports";
  return await Http.get(url);
};
