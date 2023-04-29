import React, { useState, useEffect } from "react";
import styles from "../componentStyles/faq.module.css";
import Icon from "../Icon";
import { Collapse } from "antd";
import { CiCircleRemove } from "react-icons/ci";
import { fetchFaqs } from "pages/api/faq";
import { Loader } from "components/Loader";


const { Panel } = Collapse;

function Faq() {
  const [general, setGeneral] = useState([]);
  const [technical, setTechnical] = useState([]);
  const [loading, setLoading] = useState(false)
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

  const loadData = async () => {
    setLoading(true)
    try {
      setLoading(true)
      const { data } = await fetchFaqs()
      setGeneral(data?.general);
      setTechnical(data?.technical)
      setLoading(false)
    } catch (error) {
      console.error("An error occurred while loading data:", error);
      setLoading(false)
    }
  };
  
  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return (
      <div className={styles.spin}>
        <Loader size="large" />
      </div>
    );
  }
  return (
    <div className={styles.main_div}>
      <div className={styles.sub_div1}>
        <p className={styles.head}>General FAQ</p>
        {general.map(data => (
          <Collapse
          onChange={onChange}
          className={styles.accordion_div1}
          key={data.id}
          expandIcon={(panelProps) => <CustomPanelHeader {...panelProps} />}
          size="large">
          <Panel
            header={data.title}
            key={data.id}
            className={styles.panel}>
            <p>{data.body}</p>
          </Panel>
        </Collapse>
        ))}
        
      </div>
      <div className={styles.sub_div2}>
        <p className={styles.head1}>Technical FAQ</p>
        {technical.map(data => (
          <Collapse
          onChange={onChange}
          className={styles.accordion_div1}
          key={data.id}
          expandIcon={(panelProps) => <CustomPanelHeader {...panelProps} />}
          size="large">
          <Panel
            header={data.title}
            key={data.id}
            className={styles.panel}>
            <p>{data.body}</p>
          </Panel>
         </Collapse>
        ))}
      </div>
    </div>
  );
}

export default Faq;
