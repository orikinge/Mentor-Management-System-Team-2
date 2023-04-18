import Link from "next/link";
import { useState } from "react";
import { Menu, Layout, Typography } from "antd";
import { Icon } from "components/Icon/Icon";
import { SidebarMenu } from "components/SidebarMenu";

import styles from "styles/sidebar.module.css";

const SideBar = ({ user }) => {
  const [state, setState] = useState({ name: "James", role: "Admin" });
  const { Sider } = Layout;
  const { Title, Paragraph } = Typography;

  return (
    <Sider
      className={styles.sidebar_layout}
      style={{ background: "#f7feff" }}
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={() => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <Typography style={{ padding: "32px 55px" }}>
        <Title level={4} style={{ margin: 0 }}>
          Hi, {state?.name}
        </Title>
        <Paragraph>{state?.role}</Paragraph>
      </Typography>
      <Menu className={styles.sidebar_menu} style={{ background: "none", border: "none" }}>
        {
          SidebarMenu.map((menu, idx) => (
            <Menu.Item
              key={`${idx}`}
              style={{
                paddingLeft: "55px",
                margin: 0,
                width: "100%"
              }}
              icon={<Icon name={`${menu.icon}`} />}>
              <Link href={`${menu.path}`}>
                <a className={`${styles.sidebar_link} text-light`}>{menu.name}</a>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  );
};

export default SideBar;
