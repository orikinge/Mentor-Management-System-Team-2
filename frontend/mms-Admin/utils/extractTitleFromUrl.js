export const extractTitleFromUrl = (url = "") => {
  if (url.match("-")) return url.split("-")[0];
  return url.split("/")[0];
};

export const convertToURLQuery = (obj) => {
  let query = '?';
  Object.keys(obj).forEach(
    (key) =>
      (query +=
        obj[key] === '' || obj[key] === undefined ? '' : `${key}=${obj[key]}&`),
  );
  // get rid of the last &
  return query.substring(0, query.length - 1);
};
