import { apiService } from "../../api/axios";

export const fetchTaskReports = async () => {
  const response = await apiService("/task-reports", "GET");
  return response.data.responseData;
};

export const fetchProgramReports = async () => {
  const response = await apiService("/program-reports", "GET");
  return response.data.responseData;
};

export const fetchReportAssociatedWithTask = async (id) => {
  const response = await apiService(`/tasks/${id}/reports`, "GET");
  return response.data.data;
};

export const fetchReportAssociatedWithprogram = async (id) => {
  const response = await apiService(`/programs/${id}/reports`, "GET");
  return response.data.data;
};

export const downloadTaskReport = async (id) => {
  const response = await apiService(`/task-reports/${id}/pdf`, "GET");
  return response.data;
};

export const downloadProgramReport = async (id) => {
  const response = await apiService(`/program-reports/${id}/pdf`, "GET");
  return response.data;
};
