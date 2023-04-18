import React from "react";
import styles from "../componentStyles/faq.module.css";
import Icon from "../Icon";
import { Collapse } from "antd";
import { CiCircleRemove } from "react-icons/ci";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Faq() {
  const onChange = (key) => {};
  const CustomPanelHeader = ({ title, ...panelProps }) => {
    const customIcon = panelProps.isActive ? (
      <CiCircleRemove size={18} color="#058B94" style={{ strokeWidth: "1" }} />
    ) : (
      <Icon icon={"/assets/images/plus.svg"} width={"18px"} height={"18px"} />
    );
    return (
      <div style={{ paddingTop: "8px" }}>
        {customIcon}
        <span>{title}</span>
      </div>
    );
  };
  return (
    <div className={styles.main_div}>
      <div className={styles.sub_div1}>
        <p className={styles.head}>General FAQ</p>
        <Collapse
          onChange={onChange}
          className={styles.accordion_div1}
          expandIcon={(panelProps) => <CustomPanelHeader {...panelProps} />}
          size="large">
          <Panel
            header="General Frequently Asked Question?"
            key="1"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="General Frequently Asked Question?"
            key="2"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="General Frequently Asked Question?"
            key="3"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="General Frequently Asked Question?"
            key="4"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
      <div className={styles.sub_div2}>
        <p className={styles.head1}>Technical FAQ</p>
        <Collapse
          onChange={onChange}
          className={styles.accordion_div1}
          expandIcon={(panelProps) => <CustomPanelHeader {...panelProps} />}
          size="large">
          <Panel
            header="Technical Frequently Asked Question?"
            key="1"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="Technical Frequently Asked Question?"
            key="2"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="Technical Frequently Asked Question?"
            key="3"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
          <Panel
            header="Technical Frequently Asked Question?"
            key="4"
            className={styles.panel}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default Faq;
