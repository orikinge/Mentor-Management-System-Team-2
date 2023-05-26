import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import styles from "../componentStyles/general.module.css";
import { Avatar, Col, Input, Row, Select, Button, Upload } from "antd";
import { CustomInput, CustomTextArea } from "components/formInputs/CustomInput";
import { validateInputs } from "../../utils/validateInputs";
import SuccessMessage from "../SuccessMessage";
import { fetchUserProfile, updateUserProfile } from "pages/api/user";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const initialProfileData = {
  first_name: "",
  last_name: "",
  email: "",
  bio: "",
  website: "",
  country: "",
  city: "",
};
let image_url =
  process.env.NEXT_PUBLIC_BASE_URL.replace("/api/v1", "") +
  "/uploads/upload_file/";

function General() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [error, setError]=useState(false)
  const [sMedia, setSmedia] = useState({
    instagram: "",
    github: "",
    twitter: "",
    linkedin: "",
  });
  const [success, setSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const props = {
    onRemove: (file) => {
      // const index = fileList.indexOf(file);
      // const newFileList = fileList.slice();
      // newFileList.splice(index, 1);
      setFile("");
    },
    beforeUpload: (file) => {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));

      return false;
    },
    file,
  };

  useEffect(() => {
    try{
    (async () => {
      const profile = await fetchUserProfile();
      setProfileData(profile?.data || {});

      setSmedia(
        profile?.data?.social_media_links
          ? JSON.parse(profile?.data?.social_media_links)
          : {},
      );
      setCountry(profile?.data?.country);
      setRegion(profile?.data?.city);
    })();
  }
  catch(e){
    setError(true)
  }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(file);
    setLoading(true);
    const valid = validateInputs(profileData);
    if (valid) {
      const formData = new FormData();

      try {
        const { bio, website } = profileData;
        if (file) {
          formData.append("profileImagePath", file);
        }
        console.log(sMedia);
        formData.append("bio", bio);
        formData.append("website", website);
        formData.append("socialMediaLinks", JSON.stringify(sMedia));
        formData.append("country", country);
        formData.append("city", region);
        console.log("this is smedia");
        console.log(sMedia);
        //  setLoading(false);

        const response = await updateUserProfile(formData);
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

  if(error){
    <div>
      <h2>
        Failed to fetch! Try
      </h2>
    </div>
  }

  return (
    <>
      <Row>
        <div className={styles.sub_container}>
          <Avatar
            size={73}
            icon={
              <img
                src={
                  imageUrl
                    ? imageUrl
                    : image_url + profileData?.profile_image_path
                }
                height="73px"
                width="73px"
              />
            }
          />

          <div className={styles.profile_text_container}>
            <p className={styles.set_pic_text}>Set Profile Picture</p>
            <Upload {...props} showUploadList={false}>
              <Button className={styles.small_button}>
                <div loading={uploading} className={styles.button_text}>
                  Upload Picture
                </div>
              </Button>
            </Upload>
          </div>
        </div>
      </Row>

      <Row className={styles.container}>
      <Col span={4}>
          <label className={styles.label}>Full Name</label>
        </Col>
      <Col span={20}>
      
        <div className={styles.input_container}>
          <div className={styles.input_div}>
            <CustomInput
              value={profileData.first_name}
              // onChange={handleChange}
              placeholder="First Name"
              name="first_name"
              disabled
            />
          </div>
          
          <div className={styles.input_div}>
            <CustomInput
              value={profileData?.last_name}
              // onChange={handleChange}
              placeholder="Second Name"
              name="last_name"
              disabled
            />
          </div>
        </div>
        </Col>
      </Row>

      <Row className={styles.container}>
      <Col span={4}>
          <label className={styles.label}>About</label>
        </Col>
        <Col span={20}>
        <CustomTextArea
          value={profileData.bio}
          name="bio"
          onChange={handleChange}
          placeholder="Your Bio"
          rows={4}
        />
        </Col>
        
      </Row>
      <Row className={styles.container}>
      <Col span={4}>
          <label className={styles.label}>Website</label>
        </Col>
        <Col span={20}>
        <Input
          onChange={handleChange}
          value={profileData?.website}
          className={styles.single_input}
          placeholder="www.example.com"
          name="website"
        />
        </Col>
      </Row>



      <Row className={styles.container}>
      <Col span={4}>
          <label className={styles.label}>Country</label>
        </Col>
      <Col span={20}>
      
        <div className={styles.input_container}>
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          classes={styles.select}
          showDefaultOption={true}
          defaultOptionLabel={country}
        />
          
        <label className={styles.select_label}>City</label>
        <RegionDropdown
          country={country}
          value={region}
          showDefaultOption={true}
          defaultOptionLabel={region}
          classes={styles.select}
          onChange={(val) => setRegion(val)}
        />
        </div>
        </Col>
      </Row>



      <div className={styles.select_container}>
        <Col span={3}>
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
        <Col span={3}></Col>
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
              placeholder={sMedia?.linkedin}
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
    </>
  );
}

export default General;
