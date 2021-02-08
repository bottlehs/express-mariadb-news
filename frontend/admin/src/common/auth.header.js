import Jwt from "./jwt";

export default function authHeader() {
  let accessToken = Jwt.getAccessToken();

  if (accessToken) {
    return {
      Authorization: "Bearer " + accessToken
    };
  } else {
    return {};
  }
}
