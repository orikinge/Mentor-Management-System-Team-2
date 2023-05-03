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

//gets posts
//get all posts and display - paginate
//get 1 post and display
//edit post
//comment on post
//edit comment

export async function createPost(token, fileList, postData) {
  try {
    console.log("file lists");
    console.log(fileList);
    console.log(token);
    console.log("post data");
    console.log(postData);
    console.log("token", token);
    const formData = new FormData();
    fileList.forEach((file) => {
      console.log("files");
      console.log(file);
      formData.append("image_url[]", file);
    });
    formData.append("data", JSON.stringify(postData));
    

    console.log(formData);

    for (let key of formData.entries()) {
      console.log(key);
    }

    console.log("****************************");
    console.log("****************************");

    const response = await axios.post(
      create_post,
      {
        ...formData
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    console.log("inside the function");
    console.log(response);
    return response;
  } catch (err) {
    // if (typeof err.response.data.message !== "undefined") {
    //   let errObj = {
    //     status: err.response.status,
    //     message: err.response.data.message,
    //   };

    // return errObj;
    // }
    console.log(err);
  }
}
