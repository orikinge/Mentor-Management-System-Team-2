import { fetchWrapper } from "../lib/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //TODO: to be moved to the .env

function send(message, token) {
  return fetchWrapper
    .post(`${baseUrl}/broadcast`, token, message)
    .then((message) => message);
}

function sent(page, token) {
  return fetchWrapper
    .get(`${baseUrl}/broadcast/sent?page=${page}`, token)
    .then((messages) => messages);
}

function index(page, token) {
  return fetchWrapper
    .get(`${baseUrl}/broadcast?page=${page}`, token)
    .then((messages) => messages);
}

function searchProfile(query, token) {
  return fetchWrapper
    .get(`${baseUrl}/profile/search?query=${query}`, token)
    .then((profile) => {
        console.log(profile)
        return profile
    });
}

export const broadcastService = { send, sent, index, searchProfile };
