import Image from "next/image";
import { Col, Row, Space, Typography } from "antd";
import { Button } from "components/Button";
import styles from "styles/admin/dashboard.module.scss";

const Programs = ({ programs }) => {
  const { Paragraph } = Typography;
  return (
    <div className={styles.card_container}>
      <Row justify={"space-between"}>
          <Paragraph>
            <p className={styles.card_header_text}>Programs overview</p>
          </Paragraph>
          <Paragraph>
            <p className={styles.card_header_text}>5 Active</p>
          </Paragraph>
      </Row>
      <Row justify={"space-between"} gutter={[16, 16]}>
        {programs?.map((program) => {
          return (
            <Col md={8} sm={12} xs={24} key={program.name}>
              <div className={styles.card}>
                <Image
                  src={"/assets/images/program_overview.png"}
                  width={45}
                  height={45}
                  alt="Program"
                />
                <Paragraph className={styles.paragraph}>
                  <p>{program.name}</p>
                  <small>{program.level}</small>
                </Paragraph>
                <p>{program.date}</p>
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

export default Programs;
