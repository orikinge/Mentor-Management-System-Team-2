import Image from "next/image";
import { Col, Row, Space, Typography, Progress } from "antd";
import { Button } from "components/Button";
import { Loader } from "components/Loader";
import styles from "styles/admin/dashboard.module.scss";

const programs_ = [
  {
    name: "GADS Program 2022",
    level: 50,
    date: "Apr 21, 2023",
  },
  {
    name: "GADS Program 2023",
    level: 50,
    date: "Apr 21, 2023",
  },
  {
    name: "GADS Program 2024",
    level: 50,
    date: "Apr 21, 2023",
  },
];

const Programs = ({ programs, loading }) => {
  const { Paragraph } = Typography;
  return (
    <div className={styles.card_container}>
      <Row justify={"space-between"}>
          <Paragraph>
            <p className={styles.card_header_text}>Programs overview</p>
          </Paragraph>
          <Paragraph>
            <p className={styles.card_header_text}>{programs.length} Active</p>
          </Paragraph>
      </Row>
      <Row justify={"start"} gutter={[16, 16]}>
        {programs_?.map((program) => {
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
                  <Row justify={"space-between"}>
                    <Col span={4}><small>{program.level}%</small></Col>
                    <Col span={18}><Progress percent={program.level} size="small" showInfo={false} strokeColor="#058B94" /></Col>
                  </Row>
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
