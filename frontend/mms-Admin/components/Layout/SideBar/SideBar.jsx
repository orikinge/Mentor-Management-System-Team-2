import Link from "next/link";
import { useState } from "react";
import { Menu, Layout, Typography } from "antd";
import { Icon } from "components/Icon/Icon";

const SideBar = ({ user }) => {
  const [state, setState] = useState({ name: "James", role: "Admin" });
  const { Sider } = Layout;
  const { Title, Paragraph } = Typography;

  return (
    <Sider className="sidebar-layout" style={{ background: "#f7feff" }} width={250}>
      <Typography style={{ padding: "32px 55px" }}>
        <Title level={4} style={{ margin: 0 }}>
          Hi, {state?.name}
        </Title>
        <Paragraph>{state?.role}</Paragraph>
      </Typography>
      <Menu className="sidebar-menu" style={{ background: "none", border: "none" }}>
        <Menu.Item
          key="1"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Profile" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Dashboard" />}>
          <Link href="/dashboard">
            <a className="sidebar-link text-light">Dashboard</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Program" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Programs</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Task" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Tasks</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Report" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Reports</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="6"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Mentor" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Mentors</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="7"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="MentorManager" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Mentor Managers</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="8"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="ApprovalRequest" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Approval Requests</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="9"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Certificate" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Certificates</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="10"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Message" />}>
          <Link href="/profile">
            <a className="sidebar-link">Messages</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="11"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="DiscussionForum" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Discussion Forum</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="12"
          style={{
            paddingLeft: "55px",
            margin: 0,
            width: "100%"
          }}
          icon={<Icon name="Settings" />}>
          <Link href="/profile">
            <a className="sidebar-link text-light">Settings</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
