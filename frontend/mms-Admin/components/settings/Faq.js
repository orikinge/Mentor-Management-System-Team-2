import React, { useState, useEffect } from "react";
import styles from "../componentStyles/faq.module.css";
import Icon from "../Icon";
import { Collapse } from "antd";
import { CiCircleRemove } from "react-icons/ci";
import axios from '../../pages/api/axios';

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Faq() {
  const [general, setGeneral] = useState([]);
  const [technical, setTechnical] = useState([]);
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
  const loadData = () => {
      
    const token = 'MQ.L2oPLG2ZM5TOHnsFTg3O_w91QgAzBmYezYuHH-eK6yJ2q8KLR84cuXu5dn3x';

    axios.get('faq', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setGeneral(response?.data?.general);
        setTechnical(response?.data?.technical)
      })
      .catch(error => {
        console.error('Error loading more items:', error);
      });
  };
  
  useEffect(() => {
    loadData()
  }, [])
  return (
    <div className={styles.main_div}>
      <div className={styles.sub_div1}>
        <p className={styles.head}>General FAQ</p>
        {general.map(data => (
          <Collapse
          onChange={onChange}
          className={styles.accordion_div1}
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
