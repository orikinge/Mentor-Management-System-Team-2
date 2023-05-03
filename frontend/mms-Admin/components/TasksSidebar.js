import React, { useState, useEffect, useRef } from "react";
import styles from "./componentStyles/tasksidebar.module.css";
import Icon from "./Icon";
import TasksModal from "./TasksModal";
import axios from "../pages/api/axios";
import moment from "moment";
import { useLogin } from '../hooks/useLogin';
import { fetchTasks } from "pages/api/task";
import { Loader } from "components/Loader";
import { convertToURLQuery } from "utils/extractTitleFromUrl";

function TasksSidebar(props) {
  const {token} = useLogin()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [items, setItems] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const containerRef = useRef(null);
    

    const loadMore = async () => {
      const query = { page, limit }
      try {
        setLoading(true)
        const { data } = await fetchTasks(convertToURLQuery(query))
        setData(data?.data);
        const newItems = data?.data;
        setItems(newItems);
        setPage(page + 1);
        setLoading(false)
      } catch (error) {}
    };
    
    useEffect(() => {
      loadMore()
    }, [])
    const handleScroll = () => {
      const element = containerRef.current;
      if (!element) return;
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore();
        setPage(currentPage += 1);
      } else if (scrollTop === 0 && page > 1) {
        setPage(page -= 1);
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

  if (loading) {
    return (
      <div className={styles.spin}>
        <Loader size="large" />
      </div>
    );
  }
  return (
    <div className={styles.main_div} ref={containerRef}>
    { items.length > 0 ? (
        items.map(item => (
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