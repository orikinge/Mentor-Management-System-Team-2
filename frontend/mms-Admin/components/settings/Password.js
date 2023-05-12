import { useState } from "react";
import { CustomInput, Label } from "../formInputs/CustomInput.js";
import styles from "../componentStyles/password.module.css";
import { Col, Row, Button, message } from "antd";
import { changePassword } from "pages/api/user/index.js";
import SuccessMessage from "components/SuccessMessage";

function Password() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const [Message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.newPassword || !data.oldPassword) {
        return;
      }
      if (data.confirmPassword !== data.newPassword) {
        setMessage("Passwords should match!");
        return;
      }

      if (data.newPassword === data.oldPassword) {
        setMessage("Password cannot be old password");

        return;
      }
      setMessage("");

      setLoading(true);
      const response = await changePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      console.log(response)

      if (response.status === 200) {

        setLoading(false);
        setData({})
        setIsSuccess(true);

      }
      if (response.status === 400 || response.status === 401) {
          
        setMessage(response.data.message);
      }
    } catch (e) {
      setLoading(false);
      setMessage("Invalid Credentials");
    }
  };

  const handleOnchange = (e) => {
    e.preventDefault();
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"Current Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
            name="oldPassword"
            value={data.oldPassword}
            onChange={handleOnchange}
          />
        </Col>
      </Row>

      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"New Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
            name="newPassword"
            value={data.newPassword}
            onChange={handleOnchange}
          />
        </Col>
      </Row>
      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"Confirm New Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleOnchange}
          />
          <p className={styles.error}>{Message}</p>
        </Col>
      </Row>

      <Row className={styles.btn_container}>
        <Col sm={22} className={styles.btn_sub}>
          <Button
            onClick={handleSubmit}
            className={styles.button}
            loading={loading}>
            Save New Password
          </Button>
        </Col>
      </Row>

      

      {isSuccess && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Password Successfully Changed"}
          isModalOpen={isSuccess}
          setIsModalOpen={setIsSuccess}
          logout
        />
      )}
    </div>
  );
}

export default Password;
