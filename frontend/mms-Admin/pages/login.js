import React, { useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { Col, Row } from "antd";

import AdminLogin from "../components/admin/Login";
import PasswordComponents from "../components/PasswordReset";

import styles from "../styles/admin/login.module.css";

function login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

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
