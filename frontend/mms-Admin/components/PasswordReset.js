import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./componentStyles/passwordreset.module.css";
import SuccessMessage from "./SuccessMessage";
import { validateInputs } from "utils/validateInputs";
import { passwordForgot } from "utils/http";
import { useRouter } from "next/router";

function ForgetPassword({ setForgetPassword, forgetPassword }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateInputs({ email });
    if (!email) {
      return;
    }
    if (valid) {
      try {
        setLoading(true);

        const response = await passwordForgot({ email });
        if (response.status === 200) {
          setForgetPassword(!forgetPassword);
          setLoading(false);
          router.push("/reset-password");
        }

        if (response.status === 401 || response.status === 400) {
          setLoading(false);

          throw response;
        }
      } catch (e) {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.forgot_password_text}>Forgot Password?</p>
      <p className={styles.email_confirmation_text}>
        Please enter your registered email to reset your password.
      </p>
      <Input
        size="large"
        className={styles.input}
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleChange}
      />
      <Button
        loading={loading}
        onClick={handleSubmit}
        className={styles.button}>
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
  return (
    <>
      {showPassword && !forgetPassword && (
        <ForgetPassword
          setForgetPassword={setForgetPassword}
          forgetPassword={forgetPassword}
        />
      )}
    </>
  );
}

export default PasswordComponents;
