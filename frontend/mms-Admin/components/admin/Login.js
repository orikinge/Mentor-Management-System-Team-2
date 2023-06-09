import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Form, Input, Button } from "antd";

import Icon from "../Icon";
import styles from "../componentStyles/login.module.css";
import { postLogin } from "utils/http";
import { useRouter } from "next/router";
import { validateInputs } from "../../utils/validateInputs";
import { useLogin } from "../../hooks/useLogin";

const Login = ({ showPassword, setShowPassword }) => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { setToken, token, setUser } = useLogin();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data, status } = useSession();

  const handleOnchange = (e) => {
    e.preventDefault();
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const valid = validateInputs(loginData);
    if(!valid){
      setLoading(false);

      setMessage("invalid email/password")
    }
    if (valid) {
      try {
        const response = await postLogin(loginData);

        if (response?.status === 200) {
          setToken(response.data.token.token);
          setUser(response.data)
          setMessage("Logged In Successfully");

          router.push("/");
        }

        if (response?.status === 401 || response?.status === 400) {
          setMessage(response?.message);
          setLoading(false);

        }
        setLoading(false);
      } catch (e) {
        console.log(e)
        // setMessage(e.message);
        setMessage("Network Error")
        setLoading(false);

      }
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
          <p className={styles.error}>{message}</p>
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
          <Button
            onClick={handleSubmit}
            className={styles.login_button}
            loading={loading}>
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

            <div className={styles.signin_text}>Sign in with Google</div>
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Login;