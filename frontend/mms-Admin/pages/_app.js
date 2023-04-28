import Head from "next/head";
import { useRouter } from "next/router";
import WithAuth from "../components/WithAuth";
import { SessionProvider } from "next-auth/react"


import "antd/dist/reset.css";
import "styles/globals.css";
import { styles } from "styles/_app";

const App = ({ Component, pageProps, session }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MMS - Mentor&apos;s Managers System</title>
        <link rel="icon" href="/favicon.png" />
        <style>{styles}</style>
      </Head>
      <SessionProvider session={session}>
        <WithAuth
          component={<Component {...pageProps} />}
          route={router?.route}
        />
      </SessionProvider>
    </>
  );
};

export default App;
