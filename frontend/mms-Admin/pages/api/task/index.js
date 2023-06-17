import http from "services/axios";
import { apiService } from "../axios";
import { toast } from "react-hot-toast";

export const fetchTask = async (id) => {
  const response = await apiService(`/tasks/${id}`, "GET");
  return response.data.result;
};

export const fetchTasks = async (query) => {
  const url = "/tasks";
  const response = await http.get(url);
  return response.data.data;
};

export const updateTask = async (id, payload) => {
  const url = "/task/" + id;
  return await http.put(url, payload);
};

export const deleteTask = async (taskId) => {
  const url = "/task/delete/" + taskId;
  return await http.delete(url);
};

export const createTask = async (data) => {
  const response = await apiService("/tasks", "POST", data);
  return response.data;
};

export const editTask = async (id, data) => {
  const response = await apiService(`/tasks/${id}`, "PUT", data);
  return response.data;
};
