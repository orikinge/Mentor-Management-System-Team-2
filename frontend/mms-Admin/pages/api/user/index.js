import http from "services/axios";
import { apiService } from "../../api/axios";

export const fetchMentors = async () => {
  const response = await http.get("/mentors");
  return response.data.mentors;
};

export const fetchMentorTasks = async (id) => {
  const response = await http.get(`/mentor/${id}/tasks`);
  return response.data.data;
};

export const fetchMentorAbout = async (id) => {
  const response = await http.get(`/user/${id}/about`);
  return response.data;
};

export const fetchMentorManagerData = async (id) => {
  const response = await apiService(`/user/${id}/about`, "GET");
  return response.data;
};

export const fetchMentorCertificates = async (id) => {
  const response = await http.get(`/certificate/${id}/certificates`);
  return response.data.certificates;
};

export const fetchMentorManagers = async () => {
  const response = await http.get("/mentor-managers");
  return response.data.mentorManagers;
};

export const fetchUserProfile = async () => {
  const url = "/profile";
  return await http.get(url);
};

export const updateUserProfile = async (payload) => {
  const url = "/profile";
  return await http.put(url, payload);
};

export const fetchUsers = async (query) => {
  const url = "/user" + query;
  return await http.get(url);
};

export const inviteMentor = async (payload) => {
  const url = "/user/invite";
  return await http.post(url, payload);
};

export const changePassword = async (payload) => {
  const url = "/auth/change-password/";
  return await http.post(url, payload);
};
