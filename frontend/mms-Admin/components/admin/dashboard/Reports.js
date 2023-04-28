import { Col, Row, Space, Typography } from "antd";
import { Button } from "components/Button";
import { Loader } from "components/Loader";
import { Icon } from "components/Icon/Icon";
import styles from "styles/admin/dashboard.module.scss";

const Reports = ({ reports, loading }) => {  
  const { Paragraph } = Typography;
  return (
    <div className={styles.card_container}>
      <Row justify={"space-between"}>
          <Paragraph>
            <p className={styles.card_header_text}>Reports overview</p>
          </Paragraph>
          <Paragraph>
            <p className={styles.card_header_text}>{reports?.length} Reports Submitted</p>
          </Paragraph>
      </Row>
      <Row justify={"start"} gutter={[16, 16]}>
        {reports?.map((report) => {
          return (
            <Col md={8} sm={12} xs={24} key={report.id}>
              <div className={styles.card}>
                <Icon name={report?.task ? "Task" : "Report"} width={25} height={33} color="#058B94" />
                <Paragraph className={styles.paragraph}>
                  <p>{report?.achievement}</p>
                  <small>By {report?.task?.createdBy} - {report.date}</small>
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
