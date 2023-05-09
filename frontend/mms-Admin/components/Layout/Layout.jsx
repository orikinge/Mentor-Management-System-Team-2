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
import { useStateValue } from "store/context";
import { GlobalContextProvider } from "../../Context/store";
import { fetchArchive } from "pages/api/archive";
import { convertToURLQuery } from "utils/extractTitleFromUrl";

const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState({});
  const { Content } = Layout;
  const { dispatch } = useStateValue();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    let pathname = router?.pathname;
    if (pathname === "/") setHeaderTitle("");
    else setHeaderTitle(extractTitleFromUrl(pathname?.slice(1)));
  }, [router]);

  const loadMore = async () => {
    const query = { page, limit };
    try {
      setLoading(true);
      const { data } = await fetchArchive(convertToURLQuery(query));
      const newData = data;
      setTotal(data?.meta);
      dispatch({
        type: "ARCHIVE_SEARCH",
        payload: newData,
      });
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  return (
    <GlobalContextProvider>
      <Layout className={styles.app_layout}>
        <NavBar />
        <Content>
          <Layout className={styles.app_layout}>
            <SideBar />
            <Content className={styles.app_layout_content}>
              <div className={[styles.div_input]}>
                {/* <NavHeader title={headerTitle} /> */}
                {router?.pathname === "/settings/archive" && (
                  <>
                    <Input
                      className={[styles.archive_input]}
                      size="large"
                      placeholder="Search Archive"
                      type="archive"
                      required
                    />
                    <Pagination
                      total={total?.total}
                      currentPage={page}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
                {router?.pathname === "/tasks" && (
                  <>
                    <div className={[styles.task_icon]}>
                      <div className={[styles.task_search_icon]}>
                        <Icon
                          icon={"/assets/images/search.svg"}
                          width={"20px"}
                          height={"20px"}
                        />
                      </div>
                      <div className={[styles.task_filter_icon]}>
                        <Icon
                          icon={"/assets/images/filter.svg"}
                          width={"25px"}
                          height={"25px"}
                        />
                      </div>
                    </div>
                    <span className={[styles.task_create]}>
                      <CustomButton
                        className={styles.taskbutton}
                        onClick={() => router.push("/tasks/create")}>
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
                          height={"20px"}
                        />
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
    </GlobalContextProvider>
  );
};

export default AppLayout;
