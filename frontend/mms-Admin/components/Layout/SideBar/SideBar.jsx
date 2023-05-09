import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { Icon } from "components/Icon/Icon";
import { SidebarMenu } from "components/SidebarMenu";

import { clsx } from "clsx";
import styles from "styles/sidebar.module.scss";
import { GlobalContext } from "../../../Context/store";

const SideBar = ({ user }) => {
  const router = useRouter();
  const [state, setState] = useState({ name: "James", role: "Admin" });
  const [activeMenu, setActiveMenu] = useState("");
  const { isMobileSideBarOpen, logout } = useContext(GlobalContext);

  const { Sider } = Layout;
  const { Paragraph } = Typography;

  useEffect(() => {
    const pathname = router.pathname?.split("/")[1];
    if (router.asPath === "/logout") {
      logout();
      return router.push("/login");
    }
    setActiveMenu(pathname);

    return () => {};
  }, [router.pathname]);

  return (
    <Sider
      className={styles.sidebar_layout}
      style={{ background: "#f7feff" }}
      width={250}
      breakpoint="lg"
      collapsed={isMobileSideBarOpen}
      collapsedWidth="0"
      trigger={null}
      onBreakpoint={() => {}}
      onCollapse={(collapsed, type) => {}}>
      <Typography className={styles.welcome_text_header}>
        <p className={styles.welcome_text}>Hi, {state?.name}</p>
        <Paragraph>{state?.role}</Paragraph>
      </Typography>
      <Menu className={styles.sidebar_menu}>
        {SidebarMenu.map((menu, idx) => (
          <Menu.Item
            key={`${idx}`}
            className={clsx(
              styles.item,
              menu.path.match(activeMenu) ? styles.active : "",
            )}
            icon={<Icon name={`${menu.icon}`} />}>
            <Link href={`${menu.path}`}>
              <a className={styles.link}>{menu.name}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
