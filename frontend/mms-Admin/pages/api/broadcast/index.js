import http from "services/axios";

export const fetchBroadcast = async () => {
    const url = "/broadcast"
    return await http.get(url)
}

export const createBroadcast = async (payload) => {
    const url = "/broadcast"
    return await http.post(url, payload)
}

export const searchUsers = async (query) => {
    const url = `/profile/search?query=${query}`
    return await http.get(url)
}