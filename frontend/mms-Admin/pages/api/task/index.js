import Http from "../axios/axiosClient";

export const fetchTasks = async (query) => {
  const url = "/task";
  return await Http.get(url);
};
