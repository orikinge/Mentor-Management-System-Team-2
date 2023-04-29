import http from "services/axios";

export const fetchPrivacySettings = async () => {
  const url = "/privacy-settings";
  return await http.get(url);
};

export const updatePrivacySettings = async (payload) => {
  const url = "/privacy-settings";
  return await http.put(url, payload);
};

export const fetchNotificationSettings = async () => {
  const url = "/notification-settings";
  return await http.get(url);
};

export const updateNotificationSettings = async (payload) => {
  const url = "/notification-settings";
  return await http.put(url, payload);
};