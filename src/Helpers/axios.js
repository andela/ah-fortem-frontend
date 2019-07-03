import axios from "axios";

const baseUrl = "https://ah-premier-staging.herokuapp.com/api";

export const apiCalls = (
  method,
  url,
  data = {},
  headers = { "Content-Type": "application/json" }
) => {
  const axiosMethod = axios[method];
  return axiosMethod(baseUrl + url, data, { headers: headers });
};
