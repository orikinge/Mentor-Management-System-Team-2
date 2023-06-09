import { useContext, useState, useRef, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Icon } from "components/Icon/Icon";
import { Avatar, Badge, Input } from "antd";

import styles from "styles/navbar.module.scss";
import { BarsOutlined } from '@ant-design/icons'
import { GlobalContext } from '../../../Context/store'
import NotificationIcon from 'components/NotificationIcon';
import { useStateValue } from "store/context";



const NavBar = () => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const { isMobileSideBarOpen, setMobileSideBarState, logout } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [ {notification} ] = Object.values(useStateValue())

  const router = useRouter();

  const notificationCount = (count) => {
    if (count == 20) return "20+";
    else return count;
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    setModalOpen(false);
    router.push("/dashboard");
  };

  const handleRedirectNotifications = (e) => {
    e.preventDefault();
    router.push("/notifications");
  };

  const handleRedirectsearch = (event) => {
    router.push("/search");
  };

  const handleOnchange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };


  useEffect(() => {
    if (search.length > 3) {
      handleRedirectsearch()
    }
  }, [search]);


  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    router.push("/login");
  };

  const countIsRead = notification?.data?.filter(item => item.is_read === true).length;

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
          <span className={styles.logo_text}>
            Mentor&apos;s Managers System
          </span>
        </div>

        <div className={styles.navbar_right}>
          <div className={styles.navbar_search_container}>
            <Input
              className={styles.navbar_search}
              placeholder="Search for anything"
              prefix={<Icon name="Search" />}
              size="large"
              type="search"
              value={search}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.navbar_icons_size}>
                <Badge>
                  <BarsOutlined onClick={()=> setMobileSideBarState(!isMobileSideBarOpen)}  />
                </Badge>
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
            <div onClick={handleRedirectNotifications}>
              
                <a>
                  <Badge count={notificationCount(recentNotifications?.length)}>
                    <NotificationIcon count={countIsRead || 0}/>
                    <Icon name="Notification"/>
                  </Badge>
                </a>
           
            </div>
            <div>
              <a onClick={handleDropdown}>
                <Avatar src="/assets/images/admin_avatar.png" size={42} />
              </a>
              <dialog ref={ref} open={modalOpen} className={styles.dropdown}>
                <ul>
                  <li>
                    <a onClick={handleRedirect}>Dashboard</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
