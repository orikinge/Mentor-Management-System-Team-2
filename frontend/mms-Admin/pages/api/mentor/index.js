import { toast } from "react-hot-toast";
import http from "services/axios";
import { apiService } from "../../api/axios";

export const getAllmentor = async (query) => {
  const url = "/mentors" + query;
  return await http.get(url);
};

export const getMentorsAssignedToATask = async (id) => {
  const response = await apiService(`/tasks/${id}/mentors`, "GET");
  return response.data;
};

export const getMentorManagerssAssignedToATask = async (id) => {
  const response = await apiService(`/tasks/${id}/mentor-managers`, "GET");
  return response.data;
};

export const getMentorsAssignedToAProgram = async (id) => {
  const response = await apiService(`/programs/${id}/mentors`, "GET");
  return response.data;
};

export const getMentorManagerssAssignedToAProgram = async (id) => {
  const response = await apiService(`/programs/${id}/mentor-managers`, "GET");
  return response.data;
};

export const deleteMentor = async (mentorId) => {
  const url = "/profile/delete/" + mentorId;
  return await http.put(url);
};

export const getMentorManagersTasks = async (id) => {
  const response = await apiService(`/mentor-managers/${id}/tasks`, "GET");
  return response.data.data;
};

export const getMentorManagersPrograms = async (id) => {
  const response = await apiService(`/programs/user-programs/${id}`, "GET");
  return response.data;
};

export const getMentorsOfManagers = async (id) => {
  const response = await apiService(`/mentor-managers/${id}/mentors`, "GET");
  return response.data.data;
};
