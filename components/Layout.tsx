import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="layout overflow-hidden flex-grow">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
