import http from "services/axios";

export const getAllChat = async (senderId,recipientId) => {
  const url = "/chat/" + senderId + "/" + recipientId;
  return await http.get(url);
};

export const authChatChannel = async () => {
  const url = "/chat/channel";
  return await http.post(url);
};

export const authChatUser = async () => {
  const url = "/chat/";
  return await http.post(url);
};

export const saveChat = async (receiverId, payload) => {
  const url = "/chat/" + receiverId;
  return await http.post(url, payload);
};
