import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import Privacy from "components/settings/Privacy";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";

const privacy = () => {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
          <Privacy />
        </SettingsLayout>
      </Layout>
    </Row>
  );
};

export default privacy;
