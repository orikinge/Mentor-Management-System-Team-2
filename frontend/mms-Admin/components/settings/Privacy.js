import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import styles from "../componentStyles/privacy.module.scss"
import ToggleInput from "components/ToggleInput";
import SuccessMessage from "components/SuccessMessage";

import { fetchPrivacySettings, updatePrivacySettings } from "pages/api/setting";
import { useStateValue } from "store/context";

const inputFields = [
  {
    name: "show_contact_info",
    label: "Show contact info",
  },
  {
    name: "show_github",
    label: "Show GitHub",
  },
  {
    name: "show_instagram",
    label: "Show Instagram",
  },
  {
    name: "show_linkedin",
    label: "Show LinkedIn",
  },
  {
    name: "show_twitter",
    label: "Show Twitter",
  }
];

const initialSettings = {
  show_contact_info: false,
  show_github: false,
  show_instagram: false,
  show_linkedin: false,
  show_twitter: false,
};
const Privacy = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [modalOpen, setModalOpen] = useState(false);
  const { dispatch } = useStateValue();

  useEffect(() => {
    const getSettings = async () => {
      try {
        const { data: { settings } } = await fetchPrivacySettings();
        setSettings(settings?.privacy);
      } catch (error) {}
    }

    getSettings();
  }, []);
  
  const handleChange = (name) => {
    setSettings((prevState) => {
      handleUpdate({ ...prevState, [name]: !prevState[name] });
      return {
        ...prevState, [name]: !prevState[name]
      }
    });
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleUpdate = debounce(async (settings) => {
    const payload = {
      privacy: settings
    };
    try {
      const response = await updatePrivacySettings(payload);
      if (response.status == 200) {
        dispatch({
          type: "UPDATE_PRIVACY_SETTINGS",
          payload: response?.data
        });
        setModalOpen(true);
      }
    } catch (error) {}
  }, 4000);

  return (
    <div className={styles.main}>
      {inputFields.map((field) => (
        <ToggleInput
          key={field.name}
          label={field.label}
          checked={settings[field.name]}
          handleChange={() => handleChange(field.name)} />
      ))}

      <SuccessMessage
        image={"/assets/images/success.png"}
        message={"Notification Settings Saved Successfully"}
        isModalOpen={modalOpen}
        setIsModalOpen={handleModal}
      />
    </div>
  );
}

export default Privacy;

