import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import Layout from "@/components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
