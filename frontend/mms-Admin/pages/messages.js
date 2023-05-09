import React, { useState, useEffect, useRef } from "react";
import ChatComponent from "../components/ChatComponent";
import styles from "../styles/messages.module.css";
import { Avatar } from "antd";
import Icon from "../components/Icon";
import NotificationIcon from "../components/NotificationIcon";

function Messages() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [usersList, setUsersList] = useState([]);
  const containerRef = useRef(null);

  const loadMore = () => {
    fetch(
      `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${pageSize}`,
    )
      .then((response) => response.json())
      .then((userItems) => {
        const updatedUser = usersList.concat(userItems);
        setUsersList(updatedUser);
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => {
        console.error("Error loading more items:", error);
      });
  };

  const handleScroll = () => {
    // const element = document.getElementById('scroll-container');
    const element = containerRef.current;
    if (!element) return;
    const { scrollTop, scrollHeight, clientHeight } = element;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMore();
    } else if (scrollTop === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // const element = document.getElementById('scroll-container');
    const element = containerRef.current;
    if (element) element.addEventListener("scroll", handleScroll);
    return () => {
      if (element) element.removeEventListener("scroll", handleScroll);
    };
  });

  const [isMobile, setIsMobile] = useState(false);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    if (window.innerWidth <= 992) {
      setIsMobile(true);
    }
  };

  const handleUserClose = () => {
    setIsMobile(false);
  };

  return (
    <div className={styles.main_div}>
      {!isMobile && (
        <div
          className={styles.side_div}
          id="scroll-container"
          ref={containerRef}>
          {usersList.length > 0 ? (
            usersList.map((user) => (
              <div
                className={styles.side_div_sub}
                key={user.id}
                onClick={() => handleUserClick(user.id)}>
                Helo
              </div>
            ))
          ) : (
            <div className={styles.side_div_sub} onClick={handleUserClick}>
              <div className={styles.side_div_sub_chat}>
                <Avatar
                  size={43}
                  icon={
                    <Icon
                      icon={"/assets/images/admin_avatar.png"}
                      width={"43px"}
                      height={"43px"}
                    />
                  }
                />
              </div>
              <div className={styles.side_div_sub_desc}>
                <div className={styles.side_div_sub_detail}>
                  <div className={styles.name}>Alison Davis</div>
                  <div className={styles.detail}>
                    Can we go ahead to join the ...
                  </div>
                </div>
                <div className={styles.side_div_sub_detail2}>
                  <div className={styles.time}>30m</div>
                  <div className={styles.notic}>
                    <NotificationIcon count={3} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.chat_div}>
        {<ChatComponent userId={selectedUser} />}
      </div>
      {isMobile && selectedUser && (
        <div className={styles.chat_div_mobile}>
          <ChatComponent
            userId={selectedUser}
            isModelChatClose={handleUserClose}
          />
        </div>
      )}
    </div>
  );
}

export default Messages;
