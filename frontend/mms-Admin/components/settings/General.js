import React, { useState } from "react"
import Image from "next/image";
import Icon from "../Icon"
import styles from "../componentStyles/general.module.css";
import { Input, Select } from "antd";
const { Option } = Select;

function General() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    web: '',
    bio: '',
    country: '',
    city: '',
    gitHub: '',
    twitter: '',
    linkdein: '',
    instagram:''
  });
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.profileImage_main}>
      <div className={styles.profileImage_card} >
      {file && (
       <img 
         src={URL.createObjectURL(file)}
         alt="Selected image"
          />
        )}
      </div>
      <div className={styles.profileImage_sub_upload}>
        <p>
          Set Profile Picture
        </p>
        <div>
          <label htmlFor="image-upload" className={styles.profileImage_upload_button}>
               Upload Picture
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

    <div className={styles.Name_div}>
      <div className={styles.fullName_div}>
        <label htmlFor="full_name">Full Name</label>
      </div>
       <div className={styles.firstName_div}>
          <Input
            type="text"
            id="firstName"
            name="first"
            value={formData.first}
            onChange={handleInputChange}
            required
            className={styles.firstName}
            placeholder="First Name"
          />
       </div>
       <div className={styles.lastName_div}>
        <Input
          type="text"
          id="lastName"
          name="last"
          value={formData.last}
          onChange={handleInputChange}
          required
          className={styles.lastName}
          placeholder="Last Name"
        />
       </div>
      </div>
      <div className={styles.main_div_about}>
        <div className={styles.div_about}>
        <label htmlFor="about">About</label>
        </div>
        <div className={styles.div_textarea}>
          <Input.TextArea
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
            className={styles.bio}
            placeholder="Your Bio"
          />
        </div>
      </div>
      <div className={styles.web_div}>
        <div className={styles.web_sub_div}>
           <label htmlFor="web">Website</label>
        </div>
        <div className={styles.website_div}>
          <Input
              type="text"
              id="website"
              name="web"
              value={formData.web}
              onChange={handleInputChange}
              required
              className={styles.site}
              placeholder="www.example.com"
            />
        </div>
      </div>
      <div className={styles.select_div}>
      <div className={styles.countryname_div}>
        <label htmlFor="country">Country</label>
      </div>
       <div className={styles.country_div}>
        <select name="country" id="my-select-city" onChange={handleInputChange} value={formData.country} required className={styles.country_select}>
            <option value="" disabled defaultValue>Select country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
        </select>
       </div>
       <div className={styles.cityname_div}>
        <label htmlFor="city">City</label>
      </div>
       <div className={styles.city_div}>
        <select name="city" id="my-select-city" onChange={handleInputChange} value={formData.city} required className={styles.city_select}>
           <option value="" disabled defaultValue>Select city</option>
            <option value="lagos">Lagos</option>
            <option value="kaduna">Kaduna</option>
            <option value="abuja">Abuja</option>
        </select>
       </div>
      </div>
      <div className={styles.main_social_div}>
        <div className={styles.social_name_div}>
           <label htmlFor="social">Social</label>
        </div>

        <div className={styles.social_sub_div1}>
            <div className={styles.social_sub_img}>
              <Icon
                icon={"/assets/images/Gitlogo.svg"}
                width={"18px"}
                height={"18px"}
               />
              <span className={styles.sub_img_span1}>GitHub</span>
              <div className={styles.vertical_line}></div>
              <input
              type="text"
              id="gitHub"
              name="gitHub"
              value={formData.gitHub}
              onChange={handleInputChange}
              required
              className={styles.gitHub}
              placeholder="@githubuser"
             />
            </div>
            <div className={styles.social_sub_img_1}>
              <Icon
                icon={"/assets/images/Linkeinlogo.svg"}
                width={"20px"}
                height={"20px"}
              />
              <span className={styles.sub_img_span2}>Linkdein</span>
              <div className={styles.vertical_line}></div>
                <input
                type="text"
                id="linkdein"
                name="linkdein"
                value={formData.linkdein}
                onChange={handleInputChange}
                required
                className={styles.linkdein}
                placeholder="@linkdeinbuser"
                />
            </div>
           </div>
           <div className={styles.social_sub_div2}>
            <div className={styles.social_sub_img}>
                <Icon
                  icon={"/assets/images/instagramlogo.svg"}
                  width={"20px"}
                  height={"20px"}
                />
                <span className={styles.sub_img_span3}>Instagram</span>
                <div className={styles.vertical_line}></div>
                <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                required
                className={styles.instagram}
                placeholder="@instagramuser"
            />
            </div>
            <div className={styles.social_sub_img_1}>
                <Icon
                  icon={"/assets/images/Twitterlogo.svg"}
                  width={"20px"}
                  height={"20px"}
                />
                <span className={styles.sub_img_span4}>Twitter</span>
                <div className={styles.vertical_line}></div>
                <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                required
                className={styles.twitter}
                placeholder="@twitterbuser"
                />
            </div>
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Save changes
      </button>
    </form>
    
  );
}

export default General;