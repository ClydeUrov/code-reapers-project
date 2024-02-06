import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header/Header";

function Layout() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
