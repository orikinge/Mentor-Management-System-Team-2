import Http from "../axios/axiosClient";

export const fetchPrivacySettings = async () => {
  const url = "/privacy-settings";
  return await Http.get(url);
};

export const updatePrivacySettings = async (payload) => {
  const url = "/privacy-settings";
  return await Http.put(url, payload);
};
