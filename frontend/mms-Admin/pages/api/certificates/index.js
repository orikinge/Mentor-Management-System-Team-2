import { apiService } from "../../api/axios";

export const getCertificates = async () => {
  const response = await apiService(`/certificate/`, "GET");
  return response.data;
};
