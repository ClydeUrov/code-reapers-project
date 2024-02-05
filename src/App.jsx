import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";
import { UserContext } from "./helpers/Context";
import { useState } from "react";
import { getUsetLS } from "./helpers/localStorage";

function App() {
  const [user, setUser] = useState(getUsetLS());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <main className="mb-8 text-3xl ml-4">
        <Outlet />
        <ul className="text-xl mt-8">
          <li>
            <Link to="auctions/123">AUCTIONS</Link>
          </li>
          <li>
            <Link to="user">USER</Link>
          </li>
        </ul>
      </main>
    </UserContext.Provider>
  );
}

export default App;
