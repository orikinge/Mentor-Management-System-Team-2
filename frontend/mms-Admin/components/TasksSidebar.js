import React, { useState, useEffect } from 'react'
import styles from "./componentStyles/tasksidebar.module.css";
import Icon from "./Icon";
import TasksModal from "./TasksModal";

function TasksSidebar(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [items, setItems] = useState([]);
    const [data, setData] = useState(null);

    const loadMore = () => {
      fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${pageSize}`)
        .then(response => response.json())
        .then(newItems => {
          const updatedItems = items.concat(newItems);
          setItems(updatedItems);
          setCurrentPage(currentPage + 1);
        })
        .catch(error => {
          console.error('Error loading more items:', error);
        });
    };
    
    const handleScroll = () => {
      const element = document.getElementById('scroll-container');
      if (!element) return;
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore();
      } else if (scrollTop === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    useEffect(() => {
      const element = document.getElementById('scroll-container');
      if (element) element.addEventListener('scroll', handleScroll);
      return () => {
        if (element) element.removeEventListener('scroll', handleScroll);
      };
    });
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

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleData = () => {
    fetch('/api/my-api-endpoint')
      .then(response => response.json())
      .then(newData => {
        setData(newData);
        props.onDataChanged(newData);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  };
  const handleCombinedActions = () => {
    handleData();
    handleClick();
  }

  return (
    <div className={styles.main_div} id="scroll-container">
    { items.length > 0 ? (
        items.map(item => (
        <div key={item.id} className={styles.side_container} onClick={handleCombinedActions}>
        <div className={styles.side_div_logo}>
        <Icon
        icon={"/assets/images/task.svg"}
        width={"40px"}
        height={"40px"}
        />
        </div>
        <div className={styles.side_div_item}>
        <p>
            Room Library article write...
        </p>
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
        <p>
          Room Library article write...
        </p>
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
        {isModalOpen && isMobile && <TasksModal 
            width={"300px"}
            height={"600px"}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isModelClose={handleCloseModal}
        />}
        </>
      )
    }
    </div>
  )
}

export default TasksSidebar