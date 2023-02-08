import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-1 min-h-screen">
      <Header />
      <div className="layout overflow-hidden">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
