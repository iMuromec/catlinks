import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import UserContextProvider from "@components/UserContext";
import { AppProps } from "next/app";
import Layout from "@components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </SessionProvider>
  );
};

export default App;
