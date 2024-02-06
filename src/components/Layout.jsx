import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="max-w-1440">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
