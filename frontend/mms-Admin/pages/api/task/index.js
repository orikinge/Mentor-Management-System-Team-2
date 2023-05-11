import http from "services/axios";

export const fetchTask = async (id) => {
  const url = "/task/" + id;
  return await http.get(url);
};

export const fetchTasks = async (query) => {
  const url = "/task" + query;
  return await http.get(url);
};

export const createTask = async (payload) => {
  const url = "/task";
  return await http.post(url, payload);
};

export const updateTask = async (id, payload) => {
  const url = "/task/" + id;
  return await http.put(url, payload);
};

export const deleteTask = async (taskId) => {
  const url = "/task/delete/" + taskId;
  return await http.delete(url);
};
