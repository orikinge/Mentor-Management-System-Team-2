import http from "services/axios";
export const fetchMentors = async () => {
  const url = "/user/mentors";
  return await http.get(url);
};

export const fetchMentorManagers = async () => {
  const url = "/user/mentor-managers";
  return await http.get(url);
};

export const fetchUserProfile = async () => {
  const url = "/profile";
  return await http.get(url);
};

export const updateUserProfile = async (payload) => {
  const url = "/profile";
  return await http.put(url, payload);
};
