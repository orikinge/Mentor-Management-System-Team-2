import React, { useState, useEffect, useRef } from "react";
import styles from "./componentStyles/tasksidebar.module.css";
import Icon from "./Icon";
import TasksModal from "./TasksModal";
import moment from "moment";
import { useStateValue } from "store/context";
// import { fetchTasks } from "pages/api/task";
// import { useStateValue } from "store/context";
// import { GlobalContextProvider } from "../Context/store";
// import { convertToURLQuery } from "utils/extractTitleFromUrl";

function TasksSidebar(props) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null);
  const [ {taskSearch} ] = Object.values(useStateValue())
  console.log(taskSearch)

  const loadMore = async () => {
    const query = { page, limit }
    try {
      dispatch({
        type: 'TASK_SEARCH',
        payload: query
      })
    } catch (error) {}
  };

  
  useEffect(() => {
    loadMore()
  }, [page])

  const handleScroll = () => {
    const element = containerRef.current;
    if (!element) return;
    const { scrollTop, scrollHeight, clientHeight } = element;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(prevPage => prevPage + 1);
    } else if (scrollTop === 0 && page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };
  
  
  useEffect(() => {
    const element = containerRef.current;
    if (element) element.addEventListener('scroll', handleScroll);
    return () => {
      if (element) element.removeEventListener('scroll', handleScroll);
    };

  }, []);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)");
    setIsMobile(mediaQuery.matches);
  }, []);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };


  const handleCombinedActions = (itemId, item) => {
    handleData(item);
    handleClick();
  }

  const handleData = (item) => {
    setData(item);
    props.onDataChanged(item);
  };

  return (
    <div className={styles.main_div} ref={containerRef}>
    { taskSearch?.data?.length > 0 ? (
      taskSearch?.data?.map(item => (
        <>
        <div key={item.id} className={styles.side_container}>
            <div className={styles.side_div_logo} onClick={() => handleCombinedActions(item.id, item)}>
              <Icon
                icon={"/assets/images/task.svg"}
                width={"40px"}
                height={"40px"} />
            </div>
            <div className={styles.side_div_item} onClick={() => handleCombinedActions(item.id, item)}>
              <p>
                {item.title.slice(0, 29)}...
              </p>
              <div className={styles.side_div_item_div}>
                <Icon
                  icon={"/assets/images/ClockLogo.svg"}
                  width={"16.5px"}
                  height={"16.5px"}
                  className={styles.side_div_item_icon} />
                <div className={styles.side_div_item_date}>{moment(item.endDate).diff(moment(), 'days')} days from now</div>
              </div>
            </div>
          </div>
            <div>
            {isModalOpen && isMobile && <TasksModal 
              width={"300px"}
              height={"600px"}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isModelClose={handleCloseModal}
              data={data}
          />}
            </div>
          </>
        ))
      ) : (
        <>
          <div className={styles.side_container} onClick={handleClick}>
            <div className={styles.side_div_logo}>
              <Icon
                icon={"/assets/images/task.svg"}
                width={"40px"}
                height={"40px"}
              />
            </div>
            <div className={styles.side_div_item}>
              <p>Room Library article write...</p>
              <div className={styles.side_div_item_div}>
                <Icon
                  icon={"/assets/images/ClockLogo.svg"}
                  width={"16.5px"}
                  height={"16.5px"}
                  className={styles.side_div_item_icon}
                />
                <div className={styles.side_div_item_date}>3 days from now</div>
              </div>
            </div>
          </div>
        </>
      )
    }
    </div>
  )
}

export default TasksSidebar

// axios.get(`task?page=${currentPage}&limit=${pageSize}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      //   .then(response => {
      //     setData(response?.data?.data);
      //     const newItems = response?.data?.data;
      //     setItems(newItems);
      //     setCurrentPage(currentPage + 1);
      //   })
      //   .catch(error => {
      //     console.error('Error loading more items:', error);
      //   });