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
import { CustomButton, CustomInput } from "../formInputs/CustomInput";
import { useStateValue } from "store/context";
import { GlobalContextProvider } from "../../Context/store";
import { fetchArchive } from "pages/api/archive";
import { fetchTasks } from "pages/api/task";
import { getAllmentor } from "pages/api/mentor";
import { convertToURLQuery } from "utils/extractTitleFromUrl";
import AddMentor from "../AddMentor";

const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [page, setPage] = useState(1);
  const [mentorPage, setMentorPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchMentor, setSearchMentor] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMentorSearch, setShowMentorSearch] = useState(false);
  const [total, setTotal] = useState({});
  const [mentorTotal, setMentorTotal] = useState({});
  const { Content } = Layout;
  const { dispatch } = useStateValue();
  const [{ taskSearch }] = Object.values(useStateValue());
  const [isOpen, setIsOpen] = useState(false);
  const pageNumber = taskSearch?.page;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleClickInvite = () => {
    // e.preventDefault();
    setIsOpen(true);
  };

  const handleMentorPageChange = (newPage) => {
    setMentorPage(newPage);
  };

  const handleOnchange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleOnchangeMentor = (event) => {
    event.preventDefault();
    setSearchMentor(event.target.value);
  };

  const handleOnchangeTask = (event) => {
    event.preventDefault();
    setSearchTask(event.target.value);
  };
  const handleShow = (event) => {
    event.preventDefault();
    setShowMentorSearch(!showMentorSearch);
  };

  useEffect(() => {
    let pathname = router?.pathname;
    if (pathname === "/") setHeaderTitle("");
    else setHeaderTitle(extractTitleFromUrl(pathname?.slice(1)));
  }, [router]);

  const loadMore = async () => {
    taskSearch;
    const query = { search, page, limit };
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
  }, [page, search]);

  const loadMentor = async () => {
    const query = { query: searchMentor, page: mentorPage, limit };
    try {
      setLoading(true);
      const { data } = await (convertToURLQuery(query));
      const newData = data;
      setMentorTotal(data?.mentors?.meta);
      dispatch({
        type: "MENTOR_DATA_STATE",
        payload: newData,
      });
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    loadMentor();
  }, [mentorPage, searchMentor]);

  const loadTask = async () => {
    const query = { search: searchTask, page: pageNumber, limit };

    try {
      setLoading(true);
      const { data } = await fetchTasks(convertToURLQuery(query));
      const newData = data;
      dispatch({
        type: "TASK_SEARCH",
        payload: newData,
      });
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    loadTask();
  }, [pageNumber, searchTask]);

  return (
    <GlobalContextProvider>
      <Layout className={styles.app_layout}>
        <NavBar />
        <Content>
          <Layout className={styles.app_layout}>
            <SideBar />
            <Content className={styles.app_layout_content}>
              <div className={[styles.div_input]}>
                {router?.pathname === "/settings/archive" && (
                  <>
                    <Input
                      className={[styles.archive_input]}
                      size="large"
                      placeholder="Search Archive"
                      type="archive"
                      required
                      value={search}
                      onChange={handleOnchange}
                    />
                    <Pagination
                      total={total?.total}
                      currentPage={page}
                      onPageChange={handlePageChange}
                    />
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
                      <CustomButton
                        className={styles.taskbutton}
                        onClick={() => router.push("/broadcast")}>
                        Send Broadcast Message
                      </CustomButton>
                    </span>
                  </>
                )}
                {router?.pathname === "/mentors" && (
                  <>
                    <span className={[styles.task_memtor]}>
                      <CustomButton
                        className={styles.mentorbutton1}
                        onClick={() => router.push("/broadcast")}>
                        Send Broadcast Message
                      </CustomButton>
                      <CustomButton
                        className={styles.mentorbutton}
                        onClick={() => handleClickInvite()}>
                        Add New Mentor
                      </CustomButton>
                    </span>
                    <Pagination
                      total={mentorTotal?.total || 0}
                      currentPage={mentorPage}
                      onPageChange={handleMentorPageChange}
                    />
                    {showMentorSearch !== false ? (
                      <CustomInput
                        className={[styles.archive_input]}
                        size="large"
                        placeholder="Search Mentor"
                        type="mentor"
                        required
                        value={searchMentor}
                        onChange={handleOnchangeMentor}
                      />
                    ) : (
                      ""
                    )}
                    {showMentorSearch !== false ? (
                      <div className={[styles.mentor_icon1]}>
                        <div
                          className={[styles.task_search_icon]}
                          onClick={handleShow}>
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
                    ) : (
                      <div className={[styles.mentor_icon]}>
                        <div
                          className={[styles.task_search_icon]}
                          onClick={handleShow}>
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
                    )}
                    {isOpen && (
                      <AddMentor
                        message={"Add Mentor"}
                        width={"400px"}
                        height={"200px"}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                      />
                    )}
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
