import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";


function Layout() {
  return (
    <div className="container mx-auto max-w-1440">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;