function get(url, token) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: token },
  };
  console.log(requestOptions)
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch((e) => e);
}

function post(url, token, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const fetchWrapper = { get, post };
