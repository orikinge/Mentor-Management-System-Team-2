import { apiService } from "../../api/axios";

export const getApprovalRequestSummary = async () => {
  const response = await apiService(`/requests/pending-requests`, "GET");
  return response.data;
};
