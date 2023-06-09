export function validateInputs(loginData) {
  //email validate
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (loginData.email && !loginData.email.match(mailformat)) {
    return false;
  }

  if (loginData.password && loginData.password.length < 8) {
    return false;
  }

  return true;
}
