import http from "services/axios";
import { apiService } from "../../api/axios";
import { toast } from "react-hot-toast";

export const fetchPrograms = async () => {
  const response = await http.get("/programs");
  return response.data;
};

export const fetchProgram = async (id) => {
  const response = await apiService(`/programs/${id}`, "GET");
  return response.data;
};

export const getUserProgram = async (id) => {
  const response = await http.get(`/programs/user-programs/${id}`);
  return response.data;
};

export const createProgram = async (data) => {
  const response = await apiService("/programs", "POST", data);
  return response.data;
};

export const editProgram = async (id, data) => {
  const response = await apiService(`/programs/${id}`, "PUT", data);
  return response.data;
};
