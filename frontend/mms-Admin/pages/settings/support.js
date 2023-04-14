import React from 'react'
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";
const support = () => {
  return (
    <Row className={styles.main_container}>
    <Layout className={styles.sidebar}>
    <SettingsLayout>support</SettingsLayout>
    </Layout>
  </Row>
  )
}

export default support