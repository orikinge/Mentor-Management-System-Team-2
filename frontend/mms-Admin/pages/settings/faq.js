import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";

const faq = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>Faq</SettingsLayout>
      </Layout>
    </Row>
  );
};

export default faq;
