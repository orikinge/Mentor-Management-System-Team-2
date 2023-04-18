import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Link from "next/link";
import styles from "../componentStyles/sidebar.module.css";

const menuItems = [
  { id: 1, label: "General", link: "/settings" },
  { id: 2, label: "Password", link: "/settings/password" },
  { id: 3, label: "Notifications", link: "/settings/notifications" },
  { id: 5, label: "Privacy", link: "/settings/privacy" },
  { id: 6, label: "Archive", link: "/settings/archive" },
  { id: 7, label: "Support", link: "/settings/support" },
  { id: 8, label: "FAQ", link: "/settings/faq" },
];

const SideBar = () => {
  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname],
  );

  return (
    <div className={styles.sidebar}>
      <span className={styles.sidebar_span}></span>
      <div className={styles.item_div}>
        {menuItems.map(({ ...menu }) => {
          const isActive = menu.link === activeMenu?.link;
          return (
            <div
              className={`${styles.sidebar_sub_div} ${
                isActive ? styles.active : ""
              }`}
              key={menu.id}>
              <Link href={menu.link}>
                <a className={styles.sidebar_sub_div_link}>
                  <span>{menu.label}</span>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
