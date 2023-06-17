import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import Icon from "../components/Icon";
import { Row, Col, Typography, Button, Avatar } from 'antd';
import { CustomInput, CustomTextArea } from "components/formInputs/CustomInput";
import styles from "styles/createprogram.module.css";
import buttonStyles from "styles/button.module.scss";

const initialState = {
  title: "",
  description: "",
  mentors: [],
  mentorManagers: [],
  criteria: [],
};

function create() {
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [mentorManagers, setMentorManagers] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [showMentors, setShowMentors] = useState({ show: false, type: "mentors" });

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleShowMentors = (type) => {
    setShowMentors({ show: true, type });
  };

  const checkAdded = (id) => {
    if (mentorIds.includes(id) || mentorManagerIds.includes(id) || criteriaIds.includes(id)) return true;
    return false;
  };

  const { show, type } = showMentors;
  const { mentors: mentorIds, mentorManagers: mentorManagerIds, criteria: criteriaIds } = state;


  return (
    <>
     <div>
      <form onSubmit={handleSubmit} className={styles.form}>
       <h1 className={styles.header}>Create New Program</h1>
       <Row justify="space-between" className={styles.create_program}>
       <Col span={show ? 16 : 24}>
        <Row>
          <div className={styles.image_main}>
            <div className={styles.image_card}>
              {file ? (
                <Avatar
                size={73}
                icon={
                  <Icon
                    icon={URL.createObjectURL(file)}
                    width={"73px"}
                    height={"73px"}
                  />
                }
              />
                ) : <Avatar
                size={73}
                icon={
                  <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"73px"}
                    height={"73px"}
                  />
                }
              />
              }
            </div>
            <div className={styles.image_sub_upload}>
              <p>Set Program Avatar</p>
              <div>
                <label htmlFor="image-upload" className={styles.image_upload_button}>
                  Select file
                  <input
                  id="image-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </Row>
        <div className={styles.item_container}>
            <div className={styles.container}>
              <div className={styles.label}>
                <label>Program Name</label>
              </div>
              <div className={styles.input_container}>
                <div className={styles.input_div}>
                  <CustomInput
                    value={state.title}
                    onChange={handleChange}
                    placeholder="Enter program name"
                    name="program_name"
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.container}>
              <div className={styles.label}>
                <label>Program Description</label>
              </div>
              <div className={styles.input_div}>
              <CustomTextArea
                value={state.description} 
                onChange={handleChange}
                placeholder="Program Description"
                rows={4}
              />
              </div>
            </div>
        </div>

        <Row gutter={16}>
              <Col lg={8} md={8}>
                <div className={styles.mentor_container}>
                  <Typography>
                    <h4>Add Mentor Manager</h4>
                    <span className={styles.selected_item_text}>
                      {`${mentorManagerIds.length} selected`}
                      <Image src={"/assets/images/remove_tag.png"} width={16} height={12} />
                    </span>
                  </Typography>
                  <Button
                    onClick={() => handleShowMentors("mentorManagers")}
                    className={[buttonStyles.button, buttonStyles.primary]}>
                    Select
                  </Button>
                </div>
              </Col>
              <Col lg={8} md={8}>
                <div className={styles.mentor_container}>
                  <Typography>
                    <h4>Add Mentor</h4>
                    <span className={styles.selected_item_text}>
                      {`${mentorIds.length} selected`}
                      <Image src={"/assets/images/remove_tag.png"} width={16} height={12} />
                    </span>
                  </Typography>
                  <Button
                    onClick={() => handleShowMentors("mentors")}
                    className={[buttonStyles.button, buttonStyles.primary]}>
                    Select
                  </Button>
                </div>
              </Col>
              <Col lg={8} md={8}>
                <div className={styles.mentor_container}>
                  <Typography>
                    <h4>Set Criteria</h4>
                    <span className={styles.selected_item_text}>
                      {`${criteriaIds.length} selected`}
                      <Image src={"/assets/images/remove_tag.png"} width={16} height={12} />
                    </span>
                  </Typography>
                  <Button
                    onClick={() => handleShowMentors("mentors")}
                    className={[buttonStyles.button, buttonStyles.primary]}>
                    Select
                  </Button>
                </div>
              </Col>
            </Row>
            <Button
              className={[buttonStyles.button, buttonStyles.primary, buttonStyles.medium]}
              htmlType="submit"
              loading={loading}>
              Create Program
            </Button>
        </Col>
       </Row>
       </form>
     </div>
    </>
  )
}

export default create;