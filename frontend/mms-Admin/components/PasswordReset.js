import React from "react";
import {  Button, Input } from "antd";
import styles from "./componentStyles/passwordreset.module.css";

function NewPassword() {
  return (
    <div className={styles.container}>
      <p className={styles.set_password_text}>Set New Password?</p>

      <Input.Password
        size="large"
        className={styles.input}
        placeholder="Password"
        required
      />

      <p className={styles.password_warning_text}>
        *Your new password must be different from previously used password.
      </p>

      <Button className={styles.button}>Reset Password</Button>
    </div>
  );
}

function ForgetPassword({ setForgetPassword, forgetPassword }) {
  const handleChangePassword = (e) => {
    e.preventDefault();
    setForgetPassword(!forgetPassword);
  };

  return (
    <div className={styles.container}>
      <p className={styles.forgot_password_text}>Forgot Password?</p>
      <p className={styles.email_confirmation_text}>
        An email has been sent to your registered email. <br />
        Follow the link to reset your password.
      </p>

      <Button onClick={handleChangePassword} className={styles.button}>
        Done
      </Button>
    </div>
  );
}

function PasswordComponents({
  setForgetPassword,
  showPassword,
  forgetPassword,
}) {
  console.log(showPassword);
  return (
    <>
      {showPassword && !forgetPassword && (
        <ForgetPassword
          setForgetPassword={setForgetPassword}
          forgetPassword={forgetPassword}
        />
      )}
      {forgetPassword && <NewPassword />}
    </>
  );
}

export default PasswordComponents;
