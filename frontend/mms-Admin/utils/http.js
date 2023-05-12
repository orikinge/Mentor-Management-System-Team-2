import axios from "axios";
import {
  forget_password,
  login_url,
  reset_password,
  get_profile,
  set_profile,
  support_request,
  create_post,
} from "./urls";

//login
export async function postLogin({ email, password }) {
  try {
    const response = await axios.post(login_url, {
      email: email,
      password: password,
    });
    return response;
  } catch (err) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
}
export async function passwordForgot({ email }) {
  try {
    const response = await axios.post(forget_password, {
      email: email,
    });
    return response;
  } catch (err) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
}

export async function newPassword({ password, token }) {
  try {
    const response = await axios.post(reset_password, {
      password: password,
      token: token,
    });
    return response;
  } catch (err) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
}

//profile

export async function getProfile(token) {
  try {
    const response = await axios.get(get_profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
} 

//update profile

export async function setProfile(userData, sMedia, token) {
  try {
    const response = await axios.put(
      set_profile,
      {
        ...userData,
        social_media_links: sMedia,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    return response;
  } catch (err) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
}

// support request

export async function supportRequest(token, supportData) {
  try {
    const response = await axios.post(
      support_request,
      {
        ...supportData,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    return response;
  } catch (er) {
    if (typeof err.response.data.message !== "undefined") {
      let errObj = {
        status: err.response.status,
        message: err.response.data.message,
      };

      return errObj;
    }
  }
}

