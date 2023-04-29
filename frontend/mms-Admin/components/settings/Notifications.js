import React, { useState, useEffect } from "react";
import styles from "../componentStyles/notifications.module.css";
import ToggleInput from  "components/ToggleInput";
import { fetchNotificationSettings , updateNotificationSettings } from "pages/api/setting";
import { Loader } from "components/Loader";
import debounce from "lodash.debounce";
import { useStateValue } from "store/context";

function Notifications() {

  const generalInputFields = [
    {
      name: "all",
      label: "All Notifications",
      email: "email",
      push: "push"
    },
    {
      name: "programs",
      label: "Programs",
      email: "email",
      push: "push"
    },
    {
      name: "tasks",
      label: "Tasks",
      email: "email",
      push: "push"
    },
    {
      name: "approval_requests",
      label: "Approval Requests",
      email: "email",
      push: "push"
    },
    {
      name: "reports",
      label: "Reports",
      email: "email",
      push: "push"
    }
  ];

  const discussionInputFields = [
    {
      name: "comments_on_post",
      label: "Comments on post",
      email: "email",
      push: "push"
    },
    {
      name: "posts",
      label: "Posts",
      email: "email",
      push: "push"
    },
    {
      name: "comments",
      label: "Comments",
      email: "email",
      push: "push"
    },
    {
      name: "mentions",
      label: "Mentions",
      email: "email",
      push: "push"
    },
    {
      name: "direct_message",
      label: "Direct Message",
      email: "email",
      push: "push"
    }
  ];

  const [settings, setSettings] = useState({});
  const [disSettings, setDisSettings] = useState({});
  const [_, dispatch] = Object.values(useStateValue());
  const [loading, setLoading] = useState(false);
  
  const loadNotificationSettings = async () => {
    setLoading(true)
    try {
      setLoading(true)
      const { data: {settings} } = await fetchNotificationSettings()
      setSettings(settings?.general?.notifications);
      setDisSettings(settings?.discussion?.notifications)
      setLoading(false)
    } catch (error) {
      console.error("An error occurred while loading data:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    loadNotificationSettings()
  }, [])

  const handleUpdateGen = debounce(async () => {
    const payload = {
      general_notification: settings
    };
    try {
      const response = await updateNotificationSettings(payload);
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_NOTIFICATION_SETTINGS",
          payload: response?.data
        });
      }
    } catch (error) {}
  }, 2000);

  const handleUpdateDis = debounce(async () => {
    const payload = {
      discussion_notification: disSettings
    };
    try {
      const response = await updateNotificationSettings(payload);
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_NOTIFICATION_SETTINGS",
          payload: response?.data
        });
      }
    } catch (error) {}
  }, 2000);

  const handleChange = (name,type) => {
    setSettings((prevState) => {
      return {
        ...prevState, [name]: {...prevState[name], [type]:!prevState[name][type]}
      }
    });
    handleUpdateGen();
  };
  const handleChangeDis = (name,type) => {
    setDisSettings((prevState) => {
      return {
        ...prevState, [name]: {...prevState[name], [type]:!prevState[name][type]}
      }
    });
    handleUpdateDis();
  };
  if (loading) {
    return (
      <div className={styles.spin}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={styles.main_div}>
      <div className={styles.general_div}>
        <p>General Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.main}>
        {generalInputFields.map((field) => (
          <div className={styles.item} key={field.name}>
          <span className={styles.head}>{field.label}</span>
            <div className={styles.toggle_div}>
              <span className={styles.item_span1}>
              <ToggleInput
                key={field.name}
                checked={settings[field.name]?.email}
                handleChange={() => handleChange(field.name,field.email)} />
                </span>
                <span className={styles.item_span2}>
                <ToggleInput
                  key={field.name}
                  checked={settings[field.name]?.push}
                  handleChange={() => handleChange(field.name, field.push)} />
                </span>
            </div>
           </div>
        ))}
      </div>
        
      </div>
      <div className={styles.discussion_div}>
        <p>Discussion Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.main}>
        {discussionInputFields.map((field) => (
          <div className={styles.item} key={field.name}>
          <span className={styles.head}>{field.label}</span>
            <div className={styles.toggle_div}>
              <span className={styles.item_span1}>
              <ToggleInput
                key={field.name}
                checked={disSettings[field.name]?.email}
                handleChange={() => handleChangeDis(field.name,field.email)} />
                </span>
                <span className={styles.item_span2}>
                <ToggleInput
                  key={field.name}
                  checked={disSettings[field.name]?.push}
                  handleChange={() => handleChangeDis(field.name, field.push)} />
                </span>
            </div>
           </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Notifications;
