import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./componentStyles/passwordreset.module.css";
import SuccessMessage from "./SuccessMessage";
import { validateInputs } from "utils/validateInputs";
import { passwordForgot } from "utils/http";
import { useRouter } from "next/router";

function ForgetPassword({ setForgetPassword, forgetPassword }) {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validateInputs({ email });
    if (valid) {
      try {
        const response = await passwordForgot({ email });
        if (response.status === 200) {
          setForgetPassword(!forgetPassword);
          router.push("/reset-password");
        }

        if (response.status === 401 || response.status === 400) {
          throw response;
        }
      } catch (e) {}
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.forgot_password_text}>Forgot Password?</p>
      <p className={styles.email_confirmation_text}>
        An email has been sent to your registered email. <br />
        Follow the link to reset your password.
      </p>

      <Input
        size="large"
        className={styles.login_input}
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} className={styles.button}>
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
