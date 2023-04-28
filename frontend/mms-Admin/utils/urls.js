const base_url = "http://127.0.0.1:3333/api/v1";
const login_url = base_url + "/auth/login";
const forget_password = base_url + "/auth/forget-password";
const reset_password = base_url + "/auth/reset-password";
const get_profile = base_url + "/profile";
const set_profile = base_url + "/profile";
const support_request = base_url + "/support-request";

export {
  login_url,
  forget_password,
  reset_password,
  get_profile,
  support_request,
  set_profile,
};
