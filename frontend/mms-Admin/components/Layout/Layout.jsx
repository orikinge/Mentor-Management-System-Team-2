import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import NavHeader from "components/NavHeader/NavHeader";
import { Layout } from "antd";

const AppLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const router = useRouter();
  const { Content } = Layout;

  useEffect(() => {
    const pathname = router?.pathname.slice(1);
    setHeaderTitle(pathname);
  }, [router]);

  return (
    <Layout className="app-layout">
      <NavBar />
      <Content>
        <Layout className="app-layout">
          <SideBar />
          <Content className="app-layout-content">
            <NavHeader title={headerTitle} />
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
