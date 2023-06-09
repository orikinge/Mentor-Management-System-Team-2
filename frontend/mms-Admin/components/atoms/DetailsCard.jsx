import React from "react";
import { Icon } from "components/Icon/Icon";
import IconImage from "components/Icon";
import styles from "./styles/details_card.module.scss";
import { Row, Col } from "antd";

export function ReportCard({
  icon,
  text,
  width = "179px",
  height = "69px",
  marginRight,
  color = "#E6FDFE",
  subtext,
  task,
}) {
  return (
    <Row
      xs={6}
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        marginRight: marginRight,
      }}
      className={styles.row_conatiner}>
      <div className={task ? styles.col_container_tasks : styles.col_container}>
        <div>
          <Icon name={icon} />
        </div>
        <div>
          <div className={styles.text}>{text}</div>

          {task && (
            <Row className={styles.row_center}>
              <Icon name="Calendar" width="16px" height="16px" />
              <div className={styles.subtext}>{subtext}</div>
            </Row>
          )}

          {!task && (
            <div className={`${styles.subtext_no_margin}`}>
              By Ibrahim Kabir - 19th - 25th Oct 22
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}

function DetailsCard({
  icon,
  text,
  number,
  width = "179px",
  height = "69px",
  marginRight,
  color = "#E6FDFE",
  program = false,
  subText,
}) {
  return (
    <Row
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        marginRight: marginRight,
      }}
      className={styles.row_container}>
      <div className={styles.col_container_tasks}>
        {program && (
          <div>
            <IconImage
              icon="/assets/images/program_overview.png"
              width={45}
              height={45}
              color="#058B94"
            />
          </div>
        )}

        <div className={styles.programs_col}>
          <div className={styles.text_no_width}>
            {text}
            {!program && (
              <>
                <br />
                <span className={styles.number}>{number}</span>
              </>
            )}
          </div>
        </div>
        <div>
          {!program && (
            <Icon name={icon} width={25} height={33} color="#058B94" />
          )}
        </div>
      </div>
      <div className={styles.subtext_small}>{subText}</div>
    </Row>
  );
}

export default DetailsCard;
