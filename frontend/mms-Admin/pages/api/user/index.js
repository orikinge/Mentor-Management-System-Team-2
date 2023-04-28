import Http from "../axios/axiosClient";

export const fetchMentors = async () => {
  const url = "/user/mentors";
  return await Http.get(url);
};

export const fetchMentorManagers = async () => {
  const url = "/user/mentor-managers";
  return await Http.get(url);
};
