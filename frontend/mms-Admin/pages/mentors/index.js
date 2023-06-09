import React from 'react';
import ListMentor from '../../components/ListMentor';
import GridMentor from '../../components/GridMentor';
import { useStateValue } from "store/context";
import { useRouter } from 'next/router';
import Icon from "../../components/Icon";
import { GlobalContextProvider } from "../../Context/store";
import styles from "styles/navheader.module.css";

function mentors() {
  const [showGrid, setShowGrid] = React.useState(true)
  const [showList, setShowList] = React.useState(false)
  const { dispatch } = useStateValue();
  const router = useRouter();

  const [ {gridState} ] = Object.values(useStateValue())
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
    <div>
     {gridState.showGrid !== false ? (
      <GridMentor />
     ) : (
      <ListMentor />
     )}
    </div>
    </GlobalContextProvider>
  )
}

export default mentors
