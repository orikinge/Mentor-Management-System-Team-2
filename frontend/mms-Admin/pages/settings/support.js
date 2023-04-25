import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import Support from "../../components/settings/Support.js";
import { Layout, Row, Space, Avatar } from "antd";
import styles from "../../styles/sidebar.module.scss";
import myStyles from "../../components/componentStyles/support.module.css";
import { Icon } from "../../components/Icon/Icon";

const support = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
          <Support />
        </SettingsLayout>
        <Row className={myStyles.avatar_container}>
          <div>
            <Avatar
              className={myStyles.avatar}
              size={66}
              icon={<Icon name="MessageIcon" />}
            />
          </div>
        </Row>
      </Layout>
    </Row>
  );
};

export default support;
