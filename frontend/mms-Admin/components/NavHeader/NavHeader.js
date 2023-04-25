import { capitalize } from "../../utils/capitalize";
import styles from "styles/navheader.module.css";


const NavHeader = ({ title, children }) => {
  return (
    <header className={styles.module_header}>
      {title === "profile" || title==="discussion" ? (
        ""
      ) : (
        <h2 className={styles.module_header_title}>{capitalize(title)}</h2>
      )}
      <div>{children}</div>
    </header>
  );
};

export default NavHeader;
