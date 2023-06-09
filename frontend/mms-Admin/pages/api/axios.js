import axios from "axios";
import http from "../../services/axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const apiService = (url, method, data) => {
  return new Promise((resolve, reject) => {
    http({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          toast.error("A network error has occured", { id: "network-error" });
        }
        reject(error);
      });
  });
};

export default instance;
