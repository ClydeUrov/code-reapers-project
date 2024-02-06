import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
