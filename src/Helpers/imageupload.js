import { apiCalls } from "./axios";

export default file =>
  apiCalls(
    "post",
    "https://api.imgur.com/3/image",
    file,
    {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      "Content-Type": "multipart/form-data"
    },
    false
  );
