export const extractTitleFromUrl = (url = "") => {
  if (url.match("-")) return url.split("-")[0];
  return url.split("/")[0];
};
