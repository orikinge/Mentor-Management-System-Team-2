import { Col, Row, Space, Typography } from "antd";
import { Button } from "components/Button";
import { Icon } from "components/Icon/Icon";
import styles from "styles/admin/dashboard.module.scss";

const Reports = ({ reports }) => {
  const { Paragraph } = Typography;
  return (
    <div className={styles.card_container}>
      <Row justify={"space-between"}>
          <Paragraph>
            <p className={styles.card_header_text}>Reports overview</p>
          </Paragraph>
          <Paragraph>
            <p className={styles.card_header_text}>17 Reports Submitted</p>
          </Paragraph>
      </Row>
      <Row justify={"space-between"} gutter={[16, 16]}>
        {reports?.map((report) => {
          return (
            <Col md={8} sm={12} xs={24} key={report.title}>
              <div className={styles.card}>
                <Icon name="Report" width={25} height={33} color="#058B94" />
                <Paragraph className={styles.paragraph}>
                  <p>{report.title}</p>
                  <small>By {report.author} - {report.date}</small>
                </Paragraph>
              </div>
            </Col>
          )})}
      </Row>
      <Row justify={"end"}>
        <Space className={styles.space}>
          <Button type="primary">View all</Button>
        </Space>
      </Row>
    </div>
  );
};

export default Reports;
