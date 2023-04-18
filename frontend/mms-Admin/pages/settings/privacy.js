import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";

const privacy = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>privacy</SettingsLayout>
      </Layout>
    </Row>
  );
};

export default privacy;
