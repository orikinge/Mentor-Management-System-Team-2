import React, {useState} from 'react';
import { Row, Col, Avatar } from 'antd';
import styles from 'styles/search.module.css'
import Icon from "../components/Icon";
import Pagination from "../components/Pagination";
import { Icons } from "../components/atoms/Icons";
import { ListItem } from "../components/atoms/ListItem";

function Search() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className={styles.container}>
     <div className={styles.header}>
     Search results
     </div>
     <div className={styles.sub_header}>
       <div className={styles.subp_header}>
         <span>All</span>
       </div>
       <div>
         <span>
          <Pagination
            total={20}
            currentPage={page}
            onPageChange={handlePageChange}
           />
         </span>
       </div>
     </div>
     <Row gutter={[18, 16]}>
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={`${styles.list_wrapper}`}>
          <ListItem
            className="cursor-pointer">
            <div className={`flex gap-16 flex-align-center`}>
              <Icons name="gads" />
              <div>
                <p className={`list_main_text`}>
                  Google Africa Scholarship Program
                </p>
                <div className={`flex gap-10`}>
                  <p className="flex flex-align-center gap-10 list_sub_text">
                    <Icons name="calendar" /> Dec 12, 2022
                  </p>
                  <p className="flex flex-align-center gap-10 list_sub_text">
                    <Icons name="timer" /> 8:00 pm
                  </p>
                  <p className="flex flex-align-center padding-left-40 list_sub_text">
                  In Programs
                  </p>
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem
            className="cursor-pointer">
            <div className={`flex gap-16 flex-align-center`}>
              <Icon
               icon={"/assets/images/task.svg"}
               width={"40px"}
               height={"40px"} />
              <div>
                <p className={`list_main_text`}>
                  Google Africa Scholarship Program
                </p>
                <div className={`flex gap-10`}>
                  <p className="flex flex-align-center gap-10 list_sub_text">
                    <Icons name="calendar" /> 3 Days from now
                  </p>
                  <p className="flex flex-align-center padding-left-45 list_sub_text">
                    In Tasks
                  </p>
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem
            className="cursor-pointer">
            <div className={`flex gap-16 flex-align-center`}>
             <Icons name="report-sheet" width={40}/>
              <div>
                <p className={`list_main_text`}>
                Google Africa Scholarship
                </p>
                <div className={`flex gap-10`}>
                  <p className="flex flex-align-center gap-10 list_sub_text">
                  By Ibrahim Kabir -  19th - 25th Oct 22
                  </p>
                  <p className="flex flex-align-center padding-left-40 list_sub_text">
                  In Reports
                  </p>
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem
            className="cursor-pointer">
            <div className={`flex gap-16 flex-align-center`}>
            <Icon
            icon={"/assets/images/cert.svg"}
            width={"40px"}
            height={"40px"} />
              <div>
                <p className={`list_main_text`}>
                GADS CLOUD 2022 - COMPLETION
                </p>
                <div className={`flex gap-10`}>
                <p className="flex flex-align-center padding-left-52 list_sub_text">
                  In Certificates
                </p>
                </div>
                
              </div>
            </div>
          </ListItem>
       </div>
      </Col>
    </Row>
    </div>
  )
}

export default Search
