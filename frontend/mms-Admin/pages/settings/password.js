import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";
import Password from "../../components/settings/Password";

const password = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
          <Password />
        </SettingsLayout>
      </Layout>
    </Row>
  );
};

export default password;
