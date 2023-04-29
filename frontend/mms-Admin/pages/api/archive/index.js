import http from "services/axios";

export const fetchArchive = async (query) => {
  const url = "/archive" + query;
  return await http.get(url);
};
