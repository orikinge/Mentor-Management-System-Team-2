import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "components/componentStyles/loader.module.scss";

export const Loader = () => {
    const icon = (
    <LoadingOutlined
      style={{
        fontSize: 18,
      }}
      spin
    />
  );
  
  return <div className={styles.loader}><Spin indicator={icon} size="medium" /></div>;
};
