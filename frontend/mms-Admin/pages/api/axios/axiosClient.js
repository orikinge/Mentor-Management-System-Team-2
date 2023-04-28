import { axiosInstance } from "./axiosInstance";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default {
  get(url, options) {
    return axiosInstance(baseURL)
      .get(url, options)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  post(url, request, options) {
    return axiosInstance(baseURL)
      .post(url, request, options)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  put(url, request) {
    return axiosInstance(baseURL)
      .put(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  patch(url, request) {
    return axiosInstance(baseURL)
      .patch(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  delete(url, request) {
    return axiosInstance(baseURL)
      .delete(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
