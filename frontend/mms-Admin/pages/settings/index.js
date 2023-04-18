import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import General from "../../components/settings/General";

import styles from "../../styles/settings/sidebar.module.css";

function settingsGeneral() {
  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
          <General />
        </SettingsLayout>
      </Layout>
    </Row>
  );
}

export default settingsGeneral;
