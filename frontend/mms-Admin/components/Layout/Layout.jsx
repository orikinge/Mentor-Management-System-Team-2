import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import NavHeader from "../NavHeader/NavHeader";
import { Input, Layout } from "antd";
import Pagination from "../Pagination";
import { extractTitleFromUrl } from "../../utils/extractTitleFromUrl";
import styles from "styles/layout.module.css";
import Icon from "../Icon";
import { CustomButton } from "../formInputs/CustomInput";
import { SearchDataContext } from "../searchDataContext";
import axios from '../../pages/api/axios';


const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  const { Content } = Layout;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let pathname = router?.pathname;
    if (pathname === "/") setHeaderTitle("");
    else setHeaderTitle(extractTitleFromUrl(pathname?.slice(1)));
  }, [router]);

  const [searchData, setsearchData] = useState([]);
  

  const loadMore = () => {
      
    const token = 'OA.YWauKgOJ1E1AB7PBhAt5vlGbS4qrTxVPyyBKffhg3Dcqll0OnN2ZyfA8hKxe';

    axios.get(`archive?page=${currentPage}&limit=${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setsearchData(response?.data?.data);
      })
      .catch(error => {
        console.error('Error loading more items:', error);
      });
  };

  useEffect(() => {
    loadMore()
  }, [currentPage]);

  return (
    <SearchDataContext.Provider value={searchData}>
    <Layout className={styles.app_layout}>
      <NavBar />
      <Content>
        <Layout className={styles.app_layout}>
          <SideBar />
          <Content className={styles.app_layout_content}>
            <div className={[styles.div_input]}>
            <NavHeader title={headerTitle} />
            {router?.pathname === "/settings/archive" && (
              <>
               <Input
                  className={[styles.archive_input]}
                  size="large"
                  placeholder="Search Archive"
                  type="archive"
                  required 
                />
               <Pagination total={20} currentPage={currentPage} onPageChange={handlePageChange} />
              </>
            )}
            {router?.pathname === "/tasks" && (
              <>
              <div className={[styles.task_icon]}>
                  <div className={[styles.task_search_icon]}>
                    <Icon
                      icon={"/assets/images/search.svg"}
                      width={"20px"}
                      height={"20px"} />
                  </div>
                  <div className={[styles.task_filter_icon]}>
                    <Icon
                      icon={"/assets/images/filter.svg"}
                      width={"25px"}
                      height={"25px"} />
                  </div>
                </div>
                  <span className={[styles.task_create]}>
                    <CustomButton className={styles.taskbutton}>
                    Create New Task
                    </CustomButton>
                  </span>
              </>
            )}
            {router?.pathname === "/messages" && (
              <>
              <div className={[styles.task_icon]}>
                  <div className={[styles.msg_search_icon]}>
                    <Icon
                      icon={"/assets/images/search.svg"}
                      width={"20px"}
                      height={"20px"} />
                  </div>
                </div>
                  <span className={[styles.task_create]}>
                    <CustomButton className={styles.taskbutton}>
                     Send Broadcast Message
                    </CustomButton>
                  </span>
              </>
            )}
            </div>
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  </SearchDataContext.Provider>
  );
};

export default AppLayout;
