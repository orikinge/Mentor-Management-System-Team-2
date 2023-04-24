import { Typography } from "antd";
import { Icon } from "components/Icon/Icon";
import { Button } from "components/Button";
import styles from "styles/admin/dashboard.module.scss";

const Statistics = ({ stats }) => {
  const { Title, Paragraph } = Typography;
  return (
    <div className={styles.stats}>
      <div className={styles.active_program_card}>
        <div>
          <div className={styles.header}>
            <Button>View</Button>
          </div>
          <Typography className={styles.text_container}>
            <Title className={styles.title}>12</Title>
            <Paragraph className={styles.paragraph}>
              <p>Active Programs</p>
            </Paragraph>
          </Typography>
        </div>
      </div>
      <div className={styles.card_container}>
        <div className={styles.top_cards}>
          {stats?.map((stat) => (
            <div className={styles.stats_card} key={stat.title}>
              <Paragraph style={{ margin: 0 }}>
                <p>{stat.title}</p>
                <p>{stat.value}</p>
              </Paragraph>
              <Icon
                name={`${stat.icon}`}
                color="#058b94"
                width="32"
                height="32"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
