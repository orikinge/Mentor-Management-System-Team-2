import axios from "axios";

const instance = axios.create({
  baseURL: "http://0.0.0.0:3333/api/v1/",
});

export default instance;
