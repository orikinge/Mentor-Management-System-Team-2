import React from "react";

import { Button, Form, Input } from "antd";
import Icon from "../Icon";
import styles from "../componentStyles/login.module.css";

const Login = ({ showPassword, setShowPassword }) => {
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form>
        <div>
          <p className={styles.welcome_header}>Welcome!</p>
          <p className={styles.login_text}>Login to continue</p>
        </div>
        <Input
          className={[styles.login_input, styles.login_input_margin]}
          size="large"
          placeholder="Email"
          type="email"
          required
        />

        <Input.Password
          size="large"
          className={styles.login_input}
          placeholder="Password"
          required
        />
        <div className={styles.login_button_container}>
          <Button className={styles.login_button}>Login</Button>
        </div>
        <p
          className={styles.forgot_password_text}
          onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <div className={styles.login_button_container}>
          <Button className={styles.google_login_button}>
            <Icon
              icon={"/assets/images/google_logo.png"}
              width={"38px"}
              height={"38px"}
            />

            <p className={styles.signin_text}>signin with Google</p>
          </Button>
        </div>

        <p className={styles.signup}>New User? Signup</p>
      </Form>
    </div>
  );
};
export default Login;
