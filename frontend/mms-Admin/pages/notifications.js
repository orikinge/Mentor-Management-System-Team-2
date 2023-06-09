import React, {useState, useEffect} from 'react';
import { Row, Col, Avatar } from 'antd';
import styles from 'styles/notifications.module.css'
import Icon from "../components/Icon";
import Pagination from "../components/Pagination";
import { fetchNotifications } from "pages/api/notification";
import { Loader } from "../components/atoms/Loader";
import moment from 'moment';
import { useStateValue } from "store/context";
import { convertToURLQuery } from "utils/extractTitleFromUrl";
import { GlobalContextProvider } from "../Context/store";


function Notifications() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { dispatch } = useStateValue();
  const [notificationData, setNotificationData] = useState([]);
  const [total, setTotal] = useState({});

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const loadData = async () => {
    const query = { page, limit };
    setLoading(true)
    try {
      setLoading(true)
      const { data } = await fetchNotifications(convertToURLQuery(query))
      setNotificationData(data?.data)
      setTotal(data?.meta);
      console.log(notificationData)
      setLoading(false)
      dispatch({
        type: "NOTIFICATION_ALERT",
        payload: data,
      });
    } catch (error) {
      console.error("An error occurred while loading data:", error);
      setLoading(false)
      setError(true)
    }
  };
  
  useEffect(() => {
    loadData()
  }, [page])
  if (loading) return <Loader />;
  if (error) return "An error occured";

  return (
    <GlobalContextProvider>
    <div className={styles.container}>
     <div className={styles.header}>
       Notifications
     </div>
     <div className={styles.sub_header}>
       <div className={styles.subp_header}>
         <span>All</span>
       </div>
       <div>
         <span>
          <Pagination
            total={total?.total}
            currentPage={page}
            onPageChange={handlePageChange}
           />
         </span>
       </div>
     </div>
     {notificationData?.length > 0 ? (
      <Row gutter={[18, 16]}>
      {notificationData?.map((item) => (
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={styles.item_div}>
          <div className={styles.sub_item_div}>
            <div className={styles.box_avatar}>
            <Avatar
              size={50}
              icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"50px"}
                height={"50px"}
              />
            }
           />
          </div>
          <div className={styles.box_item}>
            <div className={styles.sub_box_item}>
            <p>{item?.message}</p>
            <span>{moment(item?.created_at).format('ll  LT')}</span>
            </div>
          {/*<div className={styles.item_icon}>
              <Icon 
                icon={"/assets/images/dot.svg"}
                width={"20px"}
                height={"20px"}
            />
          </div>*/}
          </div>
          </div>
        </div>
      </Col>
      ))}
      </Row>
     ) : (
      <p>No notification found</p>
    )}
    </div>
    </GlobalContextProvider>
  )
}

export default Notifications