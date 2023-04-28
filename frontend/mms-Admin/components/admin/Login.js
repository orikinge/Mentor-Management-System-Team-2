import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button, Form, Input } from "antd";
import axios from "axios";
import Cookie from "js-cookie";

import Icon from "../Icon";
import styles from "../componentStyles/login.module.css";
import { postLogin } from "utils/http";
import { useRouter } from "next/router";
import { validateInputs } from "../../utils/validateInputs";

const Login = ({ showPassword, setShowPassword }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setToken(JSON.parse(localStorage.getItem("token")));
      router.push("/dashboard");
    }
  }, []);

  const handleOnchange = (e) => {
    e.preventDefault();
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateInputs(loginData);

    if (valid) {
      try {
        const response = await postLogin(loginData);

        if (response.status === 200) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.token.token),
          );
          localStorage.setItem("userid", JSON.stringify(response.data.user.id));
          setToken(response.data);
          router.push("/dashboard");
        }

        if (response.status === 401 || response.status === 400) {
          setMessage(response.message);
        }
      } catch (e) {}
    }
  };

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
          name="email"
          required
          value={loginData.email}
          onChange={handleOnchange}
        />

        <Input.Password
          size="large"
          className={styles.login_input}
          name="password"
          placeholder="Password"
          required
          value={loginData.password}
          onChange={handleOnchange}
        />
        <div className={styles.login_button_container}>
          <Button onClick={handleSubmit} className={styles.login_button}>
            Login
          </Button>
        </div>
        <p
          className={styles.forgot_password_text}
          onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <div className={styles.login_button_container}>
          <Button
            onClick={() => {
              signIn("google");
            }}
            className={styles.google_login_button}>
            <Icon
              icon={"/assets/images/google_logo.png"}
              width={"38px"}
              height={"38px"}
            />

            <div className={styles.signin_text}>signin with Google</div>
          </Button>
        </div>

        <p className={styles.signup}>New User? Signup</p>
      </Form>
    </div>
  );
};
export default Login;
