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


const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const router = useRouter();
  const { Content } = Layout;
  const searchData = { foo: "bar" };

  useEffect(() => {
    let pathname = router?.pathname;
    if (pathname === "/") setHeaderTitle("");
    else setHeaderTitle(extractTitleFromUrl(pathname?.slice(1)));
  }, [router]);

  return (
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
               <Pagination total={20} />
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
            </div>
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
