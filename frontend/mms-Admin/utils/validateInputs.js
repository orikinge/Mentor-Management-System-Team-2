export function validateInputs(loginData) {
  //email validate
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (loginData.email && !loginData.email.match(mailformat)) {
    errors.email = "Invalid Email";
    setErrors(() => (errors.email = "Invalid Email"));
    return false;
  }

  if (loginData.password && loginData.password.length < 8) {
    setErrors(() => (errors.password = "password length is too short"));

    return false;
  }


  return true;
}
