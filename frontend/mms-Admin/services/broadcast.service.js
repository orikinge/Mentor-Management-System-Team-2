import { fetchWrapper } from "../lib/fetch-wrapper";

const baseUrl = `http://127.0.0.1:3333/api/v1`; //-- in progress to be removed

function send(message, token) {
  return fetchWrapper
    .post(`${baseUrl}/broadcast`, token, message)
    .then((message) => message);
}

function sent(token) {
    return fetchWrapper.get(`${baseUrl}/broadcast/sent`, token).then((messages) => messages)
}

function received(token) {
    return fetchWrapper.get(`${baseUrl}/broadcast/received`, token).then((messages) => messages)
}


export const broadcastService = { send, sent, received}
