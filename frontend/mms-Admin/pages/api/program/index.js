import http from "services/axios";

export const fetchPrograms = async () => {
  const url = "/programs";
  return await http.get(url);
};

export  const getUserProgram = async (id, query) => {
  const response = await http.get(`/programs/user-programs/${id}` + query);
  console.log(response, "pp")
  return response.data.data;
}
