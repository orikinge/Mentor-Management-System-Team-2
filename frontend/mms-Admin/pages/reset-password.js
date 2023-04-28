import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Row, Col, Input, Button } from "antd";
import SplashScreen from "../components/SplashScreen";
import SuccessMessage from "../components/SuccessMessage";
import styles from "../components/componentStyles/passwordreset.module.css";
import myStyles from "../styles/admin/login.module.css";
import { newPassword } from "utils/http";
import { validateInputs } from "../utils/validateInputs";

function NewPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPass, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (router.query.token) {
        setToken(router.query.token);
      }
    }
  }, [router.isReady]);

  const handleChange = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateInputs({ newPass });

    if (valid) {
      try {
        const response = await newPassword({
          password: newPassword,
          token: token,
        });
        if (response.status === 200) {
          setIsModalOpen(true);
        }

        if (response.status === 401 || response.status === 400) {
          setMessage(response.message);
        }
      } catch (e) {}
    }
  };
  return (
    <>
      <Row className={myStyles.login_container}>
        <Col xs={24} sm={24} md={12} className={myStyles.login_splash}>
          <SplashScreen />
        </Col>
        <Col xs={24} sm={24} md={12} className={myStyles.login}>
          <div className={styles.container}>
            <p className={styles.set_password_text}>Set New Password?</p>

            <Input.Password
              size="large"
              className={styles.input}
              placeholder="Password"
              required
              value={newPass}
              onChange={handleChange}
            />

            <p className={styles.password_warning_text}>
              *Your new password must be different from previously used
              password.
            </p>

            <Button onClick={handleSubmit} className={styles.button}>
              Reset Password
            </Button>
          </div>
        </Col>
      </Row>

      {isModalOpen && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Password Reset Successful"}
          width={"220px"}
          height={"165px"}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          redirectLogin
        />
      )}
    </>
  );
}

export default NewPassword;
