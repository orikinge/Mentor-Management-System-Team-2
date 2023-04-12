import Head from "next/head";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>{`body { background-color: #f9f9f9b8 !important; }`}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
