import http from "services/axios";

export const fetchNotifications = async (query) => {
  const url = "/notifications" + query;
  return await http.get(url);
};