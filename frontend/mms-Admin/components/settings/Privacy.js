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
const Privacy = () => {
  const [settings, setSettings] = useState({});
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
      return {
        ...prevState, [name]: !prevState[name]
      }
    });
    handleUpdate();
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleUpdate = debounce(async () => {
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
  }, 2000);

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

