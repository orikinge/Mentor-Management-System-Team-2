import http from "services/axios";

export const fetchFaqs = async (query) => {
  const url = "/faq";
  return await http.get(url);
};

