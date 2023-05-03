import Head from "next/head";
import { useRouter } from "next/router";
import WithAuth from "../components/WithAuth";
import { SessionProvider } from "next-auth/react";
import ContextProvider from "store/context";
import Login from "./login";

import "antd/dist/reset.css";
import "styles/globals.css";
import { styles } from "styles/_app";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";

const App = ({ Component, pageProps, session }) => {
  const { token } = useLogin();
  const router = useRouter();

  if (!token) {
    return (
      <>
        <ContextProvider>
          <SessionProvider session={session}>
            <Login />
          </SessionProvider>
        </ContextProvider>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>MMS - Mentor&apos;s Managers System</title>
        <link rel="icon" href="/favicon.png" />
        <style>{styles}</style>
      </Head>
      <ContextProvider>
        <SessionProvider session={session}>
          <WithAuth
            component={<Component {...pageProps} />}
            route={router?.route}
          />
        </SessionProvider>
      </ContextProvider>
    </>
  );
};

export default App;
