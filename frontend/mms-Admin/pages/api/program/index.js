import Http from "../axios/axiosClient";

export const fetchPrograms = async () => {
  const url = "/programs";
  return await Http.get(url);
};
