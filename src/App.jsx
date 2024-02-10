import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AuctionPage from "./pages/AuctionPage";
import Auth0ProviderWithHistory from "./auth0Provider";
import TEST from "./pages/TEST";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/test" element={<TEST />} />
          <Route path="/auction/:auctionId" element={<AuctionPage />} />
        </Route>
      </Routes>
    </Auth0ProviderWithHistory>
  );
}

export default App;
