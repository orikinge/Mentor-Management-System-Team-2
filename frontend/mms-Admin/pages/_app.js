import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

const App = ({ Component, pageProps, session }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { token } = useLogin();
  const router = useRouter();

  if (!token) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <SessionProvider session={session}>
              <Login />
            </SessionProvider>
          </ContextProvider>
        </QueryClientProvider>
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
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <SessionProvider session={session}>
            <WithAuth
              component={getLayout(<Component {...pageProps} />)}
              route={router?.route}
            />
          </SessionProvider>
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
