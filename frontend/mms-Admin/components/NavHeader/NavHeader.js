import React from 'react';
import { useRouter } from 'next/router';
import { capitalize } from "../../utils/capitalize";
import styles from "styles/navheader.module.css";
import Icon from "../Icon";
import { useStateValue } from "store/context";
import { GlobalContextProvider } from "../../Context/store";


const NavHeader = ({ title, children }) => {
  const [showGrid, setShowGrid] = React.useState(true)
  const [showList, setShowList] = React.useState(false)
  const { dispatch } = useStateValue();
  const router = useRouter();
  const hideItem = router.pathname.includes('/mentors/');
  const showItem = router.pathname.includes('/mentors');

  // const handleGrid = (event) => {
  //   event.preventDefault();
  //   setShowGrid(!showList);
  //   setShowList(!showList)
  // };
  const handleGrid = (event) => {
    // event.preventDefault();
    if (showList) {
      setShowList(false);
      setShowGrid(true);
      dispatch({
        type: 'MENTOR_GRID_STATE',
        payload: {showList, showGrid}
      })
    } else {
      setShowList(true);
      setShowGrid(false);
      dispatch({
        type: 'MENTOR_GRID_STATE',
        payload: {showList, showGrid}
      })
    }
  };
  React.useEffect(() => {
    handleGrid()
  }, [])
  return (
    <GlobalContextProvider>
    <header className={styles.module_header} style={{ display: hideItem ? 'none' : (showItem ? 'flex' : 'flex') }}>
      {title === "profile" || title==="discussion" || title === "messages" || title === "mentors" ? (
        ""
      ) : (
        <h2 className={styles.module_header_title}>{capitalize(title)}</h2>
      )}
      {title === "messages" ? (
        <h2 className={styles.module_header_title}>{capitalize("Chats")}</h2>
      ) : ""}

      {title === "mentors" ? (
        <h2 className={styles.module_header_title}>{capitalize("Mentors")}
          <span className={styles.module_header_span} onClick={handleGrid}>
            {showGrid === true ? (
              <Icon
              icon={"/assets/images/grid-on.svg"}
              width={"20px"}
              height={"20px"}
            />
            ): (
              <Icon
              icon={"/assets/images/grid-active.svg"}
              width={"20px"}
              height={"20px"}
            />
            )}
         </span>
         <span style={{marginLeft: "1rem"}} onClick={handleGrid}>
           {showList === true ? (
            <Icon
            icon={"/assets/images/list-on.svg"}
            width={"22px"}
            height={"22px"}
          />
           ): (
            <Icon
             icon={"/assets/images/list-active.svg"}
             width={"22px"}
             height={"22px"}
           />
           )}
         </span>
      </h2>
      ) : ""}
      <div>{children}</div>
    </header>
    </GlobalContextProvider>
  );
};

export default NavHeader;
