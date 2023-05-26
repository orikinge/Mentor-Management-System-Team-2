import http from "services/axios";


export const createSupportRequest = async (payload) => {
  const url = "/support-request";

  return await http.post(url, payload);
};
