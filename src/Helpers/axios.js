import axios from "axios";

const baseUrl = "https://ah-premier-staging.herokuapp.com/api";

export const apiCalls = (
  method,
  url,
  data = {},
  headers = { "Content-Type": "application/json" },
  heroku = true
) => {
  const axiosMethod = axios[method];
  // not all API calls will be going to heroku. some will be going to imgur for image uploads
  const resolvedUrl = heroku ? baseUrl + url : url;
  return axiosMethod(resolvedUrl, data, { headers: headers });
};

export const deleteCalls = (method, url, token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  };
  const axiosMethod = axios[method];
  return axiosMethod(baseUrl + url, { headers: headers });
};
