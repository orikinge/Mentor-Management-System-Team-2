import http from "services/axios";

export const fetchPosts = async (page) => {
  const url = "/post?page=" + page;
  return await http.get(url);
};

export const fetchSinglePost = async (id) => {
  const url = "/post/" + id;
  return await http.get(url);
};

export const createPost = async (payload) => {
  const url = "/post";

  return await http.post(url, payload);
};

export const createComment = async (id, payload) => {
  const url = "/comment/" + id;
  return await http.post(url, payload);
};
