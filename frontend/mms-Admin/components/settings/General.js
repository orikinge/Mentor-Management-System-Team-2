import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import styles from "../componentStyles/general.module.css";
import { Avatar, Col, Input, Row, Select, Button } from "antd";
import { CustomInput, CustomTextArea } from "components/formInputs/CustomInput";
import { validateInputs } from "../../utils/validateInputs";
import SuccessMessage from "../SuccessMessage";
import { fetchUserProfile, updateUserProfile } from "pages/api/user";

const initialProfileData = {
  first_name: "",
  last_name: "",
  email: "",
  bio: "",
  website: "",
  country: "",
  city: "",
};

function General() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const [sMedia, setSmedia] = useState({
    instagram: "",
    github: "",
    twitter: "",
    linkedin: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const profile = await fetchUserProfile();
      setProfileData(profile?.data || {});
      setSmedia(profile?.data?.social_media_links);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const valid = validateInputs(profileData);
    if (valid) {
      try {
        const { bio, email, first_name, last_name, website, country, city } =
          profileData;
        const response = await updateUserProfile({
          bio,
          email,
          first_name,
          last_name,
          website,
          country,
          city,
          social_media_links: sMedia,
        });
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
        }

        if (
          response.status === 401 ||
          response.status === 400 ||
          response.status === 404
        ) {
          throw response;
        }
      } catch (e) {}
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSocials = (e) => {
    e.preventDefault();
    setSmedia((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Row>
        <div className={styles.sub_container}>
          <Avatar
            size={73}
            icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"73px"}
                height={"73px"}
              />
            }
          />
          <div className={styles.profile_text_container}>
            <p className={styles.set_pic_text}>Set Profile Picture</p>
            <Button className={styles.small_button}>
              <div className={styles.button_text}>Upload Picture</div>
            </Button>
          </div>
        </div>
      </Row>

      <Row className={styles.container}>
        <div className={styles.label}>
          <label>Full Name</label>
        </div>
        <div className={styles.input_container}>
          <div className={styles.input_div}>
            <CustomInput
              value={profileData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              name="first_name"
            />
          </div>
          <div className={styles.input_div}>
            <CustomInput
              value={profileData?.last_name}
              onChange={handleChange}
              placeholder="Second Name"
              name="last_name"
            />
          </div>
        </div>
      </Row>

      <Row className={styles.container}>
        <div className={styles.label}>
          <label>About</label>
        </div>

        <CustomTextArea
          value={profileData.bio} 
          name="bio"
          onChange={handleChange}
          placeholder="Your Bio"
          rows={4}
        />
      </Row>
      <Row className={styles.container}>
        <div className={styles.label}>
          <label>Website</label>
        </div>
        <Input
          onChange={handleChange}
          value={profileData?.website}
          className={styles.single_input}
          placeholder="www.example.com"
          name="website"
        />
      </Row>

      <div className={styles.select_container}>
        <label className={styles.label}>Country</label>
        <Select
          size={"large"}
          placeholder="Select Country"
          className={styles.select}
          options={[
            {
              label: "Nigeria",
              value: "Nigeria",
            },
            {
              label: "Ghana",
              value: "Ghana",
            },
            {
              label: "United State of America",
              value: "USA",
            },
          ]}
        />
        <label className={styles.select_label}>City</label>
        <Select
          size={"large"}
          placeholder="Select City"
          className={styles.select}
          options={[
            {
              label: "Lagos",
              value: "Lagos",
            },
            {
              label: "Abuja",
              value: "Abuja",
            },
            {
              label: "Accra",
              value: "Accra",
            },
          ]}
        />
      </div>

      <div className={styles.select_container}>
        <Col span={2}>
          <label className={styles.label}>Socials</label>
        </Col>
        <Col span={10}>
          <div className={styles.socials_container}>
            <div className={styles.social_icons}>
              <div>
                <Icon
                  icon={"/assets/images/Gitlogo.svg"}
                  width={"24px"}
                  height={"24px"}
                />
              </div>
              <div className={styles.icon_text}>GitHub</div>
            </div>
            <Input
              name="github"
              value={sMedia?.github}
              onChange={handleSocials}
              className={styles.input_border}
            />
          </div>
        </Col>
        <Col span={9}>
          <div className={styles.socials_container}>
            <div className={styles.social_icons}>
              <div>
                <Icon
                  icon={"/assets/images/instagramlogo.svg"}
                  width={"24px"}
                  height={"24px"}
                />
              </div>
              <div className={styles.icon_text}>instagram</div>
            </div>
            <Input
              name="instagram"
              value={sMedia?.instagram}
              onChange={handleSocials}
              className={styles.input_border}
            />
          </div>
        </Col>
      </div>
      <div className={styles.select_container}>
        <Col span={2}></Col>
        <Col span={10}>
          <div className={styles.socials_container}>
            <div className={styles.social_icons}>
              <div>
                <Icon
                  icon={"/assets/images/Linkeinlogo.svg"}
                  width={"24px"}
                  height={"24px"}
                />
              </div>
              <div className={styles.icon_text}>linkedIn</div>
            </div>
            <Input
              name="linkedin"
              value={sMedia?.linkedin}
              onChange={handleSocials}
              className={styles.input_border}
            />
          </div>
        </Col>
        <Col span={9}>
          <div className={styles.socials_container}>
            <div className={styles.social_icons}>
              <div>
                <Icon
                  icon={"/assets/images/Twitterlogo.svg"}
                  width={"24px"}
                  height={"24px"}
                />
              </div>
              <div className={styles.icon_text}>Twitter</div>
            </div>
            <Input
              name="twitter"
              value={sMedia?.twitter}
              onChange={handleSocials}
              className={styles.input_border}
            />
          </div>
        </Col>
      </div>
      <div className={styles.btn_container}>
        <Button className={styles.btn} loading={loading} onClick={handleSubmit}>
          <span className={styles.btn_text}>Save Changes</span>
        </Button>
      </div>
      {success && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Profile Information Updated Successfully"}
          isModalOpen={success}
          setIsModalOpen={setSuccess}
        />
      )}
    </div>
  );
}

export default General;
