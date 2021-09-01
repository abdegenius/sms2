import axios from "axios";
import { api_url } from "../index";

const BASE_URL = api_url.BASE_URL;

export async function LOG_USER_IN(email, password, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    user = await user.json();

    user.status === "success" && callback && callback(user);

    if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
