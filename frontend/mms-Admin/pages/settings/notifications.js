import React from 'react'
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";
const notifications = () => {
  return (
    <Row className={styles.main_container}>
    <Layout className={styles.sidebar}>
    <SettingsLayout>notifications</SettingsLayout>
    </Layout>
  </Row>
  )
}

export default notifications