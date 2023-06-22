import { Row, Col } from "antd";
import Sidebar from "./settings/SideBar";
import styles from "./componentStyles/settingslayout.module.css";

const SettingsLayout = ({ children }) => {
  return (
    <Row justify={"space-between"} >
      <Col span={4}><Sidebar /></Col>
      <Col span={18}><div className={styles.sub_div}>{children}</div></Col>
    </Row>
  );
};

export default SettingsLayout;
