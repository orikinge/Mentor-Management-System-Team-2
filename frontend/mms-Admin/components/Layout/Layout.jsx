import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import NavHeader from "../NavHeader/NavHeader";
import { Layout, Input } from "antd";
import { extractTitleFromUrl } from "utils/extractTitleFromUrl"
import styles from "../componentStyles/login.module.css";
import Pagination from "../Pagination"

const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const router = useRouter();
  const { Content } = Layout;
  const searchData = { foo: 'bar' }

  useEffect(() => {
    let pathname = router?.pathname
    if(pathname === "/") setHeaderTitle("");
    else setHeaderTitle(extractTitleFromUrl(pathname?.slice(1)));
  }, [router]);

  return (
    <Layout className="app-layout">
      <NavBar />
      <Content>
        <Layout className="app-layout">
          <SideBar />
          <Content className="app-layout-content">
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

            </div>
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
