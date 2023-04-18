import Head from "next/head";
import { useRouter } from "next/router";
import WithAuth from "../components/WithAuth";

import "antd/dist/reset.css";
import "styles/globals.css";
import { styles } from "styles/_app";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MMS - Mentor&apos;s Managers System</title>
        <style>{styles}</style>
      </Head>
      <WithAuth
        component={<Component {...pageProps} />}
        route={router?.route}
      />
    </>
  );
};

export default App;
