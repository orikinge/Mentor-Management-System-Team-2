import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout } from "antd";
import General from "../../components/settings/General";

function settingsGeneral() {
  return (
    <Layout>
      <SettingsLayout>
        <General />
      </SettingsLayout>
    </Layout>
  );
}

export default settingsGeneral;
