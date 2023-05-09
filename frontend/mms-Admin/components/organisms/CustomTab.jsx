import styles from "./styles/custom_tab.module.scss";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const CustomTab = (props) => {
  const { children, tabs } = props;
  const router = useRouter();

  return (
    <div>
      <div className={`${styles.tab_header} flex flex-justify-around`}>
        {tabs?.map((item) => {
          const activeTab = router.pathname.includes(item.name.toLowerCase());

          return (
            <div
              key={item.name}
              className={`${activeTab ? styles.active : ""} ${
                styles.link_wrapper
              }`}>
              <Link className={styles.tab_title} href={item.link}>
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
      <>{children}</>
    </div>
  );
};

CustomTab.prototype = {
  children: PropTypes.node,
  tabs: PropTypes.array,
};
