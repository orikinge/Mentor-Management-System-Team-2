import React, { useState } from "react";
import styles from "../componentStyles/notifications.module.css";
import { Switch } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function Notifications() {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleChange1 = (checked1) => {
    setChecked1(checked1);
  };
  const handleChange2 = (checked2) => {
    setChecked2(checked2);
  };
  const handleChange3 = (checked3) => {
    setChecked3(checked3);
  };
  const handleChange4 = (checked4) => {
    setChecked4(checked4);
  };
  const handleChange5 = (checked5) => {
    setChecked5(checked5);
  };
  const handleChange6 = (checked6) => {
    setChecked6(checked6);
  };
  const handleChange7 = (checked7) => {
    setChecked7(checked7);
  };
  const handleChange8 = (checked8) => {
    setChecked8(checked8);
  };
  const handleChange9 = (checked9) => {
    setChecked9(checked9);
  };

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedIn1, setCheckedIn1] = useState(false);
  const [checkedIn2, setCheckedIn2] = useState(false);
  const [checkedIn3, setCheckedIn3] = useState(false);
  const [checkedIn4, setCheckedIn4] = useState(false);
  const [checkedIn5, setCheckedIn5] = useState(false);
  const [checkedIn6, setCheckedIn6] = useState(false);
  const [checkedIn7, setCheckedIn7] = useState(false);
  const [checkedIn8, setCheckedIn8] = useState(false);
  const [checkedIn9, setCheckedIn9] = useState(false);

  const handleChangeIn = (checkedIn) => {
    setCheckedIn(checkedIn);
  };
  const handleChangeIn1 = (checkedIn1) => {
    setCheckedIn1(checkedIn1);
  };
  const handleChangeIn2 = (checkedIn2) => {
    setCheckedIn2(checkedIn2);
  };
  const handleChangeIn3 = (checkedIn3) => {
    setCheckedIn3(checkedIn3);
  };
  const handleChangeIn4 = (checkedIn4) => {
    setCheckedIn4(checkedIn4);
  };
  const handleChangeIn5 = (checkedIn5) => {
    setCheckedIn5(checkedIn5);
  };
  const handleChangeIn6 = (checkedIn6) => {
    setCheckedIn6(checkedIn6);
  };
  const handleChangeIn7 = (checkedIn7) => {
    setCheckedIn7(checkedIn7);
  };
  const handleChangeIn8 = (checkedIn8) => {
    setCheckedIn8(checkedIn8);
  };
  const handleChangeIn9 = (checkedIn9) => {
    setCheckedIn9(checkedIn9);
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.general_div}>
        <p>General Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.item}>
          <span className={styles.head}>All Notifications</span>
          <span className={styles.item_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked1 ? "#058B94" : "#B3B3B3" }}
              checked={checked1}
              onChange={handleChange1}
            />
          </span>
        </div>
        <div className={styles.item1}>
          <span className={styles.head}>Programs</span>
          <span className={styles.item1_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked2 ? "#058B94" : "#B3B3B3" }}
              checked={checked2}
              onChange={handleChange2}
            />
          </span>
          <span className={styles.item1_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked3 ? "#058B94" : "#B3B3B3" }}
              checked={checked3}
              onChange={handleChange3}
            />
          </span>
        </div>
        <div className={styles.item2}>
          <span className={styles.head}>Tasks</span>
          <span className={styles.item2_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked4 ? "#058B94" : "#B3B3B3" }}
              checked={checked4}
              onChange={handleChange4}
            />
          </span>
          <span className={styles.item2_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked5 ? "#058B94" : "#B3B3B3" }}
              checked={checked5}
              onChange={handleChange5}
            />
          </span>
        </div>
        <div className={styles.item3}>
          <span className={styles.head}>Approval Requests</span>
          <span className={styles.item3_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked6 ? "#058B94" : "#B3B3B3" }}
              checked={checked6}
              onChange={handleChange6}
            />
          </span>
          <span className={styles.item3_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked7 ? "#058B94" : "#B3B3B3" }}
              checked={checked7}
              onChange={handleChange7}
            />
          </span>
        </div>
        <div className={styles.item4}>
          <span className={styles.head}>Reports</span>
          <span className={styles.item4_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked8 ? "#058B94" : "#B3B3B3" }}
              checked={checked8}
              onChange={handleChange8}
            />
          </span>
          <span className={styles.item4_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked9 ? "#058B94" : "#B3B3B3" }}
              checked={checked9}
              onChange={handleChange9}
            />
          </span>
        </div>
      </div>
      <div className={styles.discussion_div}>
        <p>Discussion Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.item_dis}>
          <span className={styles.head}>Comments on my post</span>
          <span className={styles.item_dis_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn}
              onChange={handleChangeIn}
            />
          </span>
          <span className={styles.item_dis_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn1 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn1}
              onChange={handleChangeIn1}
            />
          </span>
        </div>
        <div className={styles.item_dis1}>
          <span className={styles.head}>Posts</span>
          <span className={styles.item_dis1_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn2 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn2}
              onChange={handleChangeIn2}
            />
          </span>
          <span className={styles.item_dis1_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn3 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn3}
              onChange={handleChangeIn3}
            />
          </span>
        </div>
        <div className={styles.item_dis2}>
          <span className={styles.head}>Comments</span>
          <span className={styles.item_dis2_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn4 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn4}
              onChange={handleChangeIn4}
            />
          </span>
          <span className={styles.item_dis2_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn5 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn5}
              onChange={handleChangeIn5}
            />
          </span>
        </div>
        <div className={styles.item_dis3}>
          <span className={styles.head}>Mentions</span>
          <span className={styles.item_dis3_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn6 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn6}
              onChange={handleChangeIn6}
            />
          </span>
          <span className={styles.item_dis3_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn7 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn7}
              onChange={handleChangeIn7}
            />
          </span>
        </div>
        <div className={styles.item_dis4}>
          <span className={styles.head}>Direct Message</span>
          <span className={styles.item_dis4_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn8 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn8}
              onChange={handleChangeIn8}
            />
          </span>
          <span className={styles.item_dis4_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checkedIn9 ? "#058B94" : "#B3B3B3" }}
              checked={checkedIn9}
              onChange={handleChangeIn9}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
