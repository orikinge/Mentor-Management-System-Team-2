import { Button, Typography } from "antd";
import { Icon } from "components/Icon/Icon"

import styles from "styles/admin/dashboard.module.css";

const stats = [
  {
    title: "Mentors",
    value: 30,
    icon: "Person",
  },
  {
    title: "Mentor Managers",
    value: 10,
    icon: "People",
  },
  {
    title: "Tasks",
    value: 40,
    icon: "Task",
  },
  {
    title: "Reports",
    value: 38,
    icon: "Report",
  },
];

const Dashboard = () => {
  const { Paragraph, Title } = Typography;
  return (
    <div className="dashboard">
      <div className={styles.stats}>
        <div style={{ background: "#058b94", borderRadius: "7px", padding: "12px", width: "250px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button>View</Button>
            </div>
            <Typography style={{ display: "flex", justifyContent: "start", alignItems: "end" }}>
              <Title level={6} style={{ color: "#fff", marginRight: "12px", marginBottom: 0 }}>12</Title>
              <Paragraph style={{ margin: 0 }}>
                <p style={{ color: "#f7feff", margin: 0, width: "80%", fontWeight: 500, fontSize: "20px" }}>Active Programs</p>
              </Paragraph>
            </Typography>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className={styles.top_cards}>
            {
              stats.map((stat) => (
                <div className={styles.card} key={stat.title}>
                  <Paragraph style={{ margin: 0 }}>
                    <p style={{ margin: 0, fontSize: "20px" }}>{stat.title}</p>
                    <p style={{ margin: 0, fontSize: "20px" }}>{stat.value}</p>
                  </Paragraph>
                  <Icon name={`${stat.icon}`} color="#058b94" width="32" height="32" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
