import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "components/Icon/Icon";
import { Avatar, Badge, Input } from "antd";

import styles from "styles/navbar.module.css";

const NavBar = () => {
  const [recentNotifications, setRecentNotifications] = useState([]);

  const notificationCount = (count) => {
    if (count == 20) return "20+";
    else return count;
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo_container}>
          <Image
            width={69}
            height={69}
            src={"/assets/images/logo_small.png"}
            alt="logo"
          />
          <span className={styles.logo_text}>Mentor&apos;s Managers System</span>
        </div>

        <div className={styles.navbar_right}>
          <div className={styles.navbar_search_container}>
            <Input
              className={styles.navbar_search}
              placeholder="Search for anything"
              prefix={<Icon name="Search" />}
              size="large"
            />
          </div>
          <div className={styles.navbar_icons}>
            <div>
            <Link href="/home">
              <a>
                <Badge>
                  <Icon name="Chat" />
                </Badge>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/home">
              <a>
                <Badge count={notificationCount(recentNotifications?.length)}>
                  <Icon name="Notification" />
                </Badge>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/profile">
              <a>
                <Avatar src="/assets/images/user.png" />
              </a>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
