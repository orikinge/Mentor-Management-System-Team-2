import React, { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen";
import { Col, Row } from "antd";

import AdminLogin from "../components/admin/Login";
import PasswordComponents from "../components/PasswordReset";

import styles from "../styles/admin/login.module.scss";
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/router";

function login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const { token, setToken } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);

 




  return (
    <Row className={styles.login_container}>
      <Col xs={24} sm={24} md={12} className={styles.login_splash}>
        <SplashScreen />
      </Col>
      {showPassword ? (
        <Col xs={24} sm={24} md={12} className={styles.login}>
          <PasswordComponents
            showPassword={showPassword}
            forgetPassword={forgetPassword}
            setForgetPassword={setForgetPassword}
          />
        </Col>
      ) : (
        <Col xs={24} sm={24} md={12} className={styles.login}>
          <AdminLogin
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </Col>
      )}
    </Row>
  );
}

export default login;
