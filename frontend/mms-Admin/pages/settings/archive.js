import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";
import Archive from "../../components/settings/Archive";

const archive = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
          <Archive />
        </SettingsLayout>
      </Layout>
    </Row>
  );
};

export default archive;
