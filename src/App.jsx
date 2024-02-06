import { Route, Routes } from "react-router-dom";
import { UserContext } from "./helpers/Context";
import { useState } from "react";
import { getUsetLS } from "./helpers/localStorage";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AuctionPage from "./pages/AuctionPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth0ProviderWithHistory from "./auth0Provider";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/auction/:auctionId" element={<AuctionPage />} />
        </Route>
      </Routes>
      {/* <ToastContainer
        autoClose={3000}
        position="top-center"
        stacked
        closeButton={() => <CloseButtonIcon />}
        style={{
          borderRadius: "2rem",
        }}
      /> */}
    </Auth0ProviderWithHistory>
  );
}

export default App;

// <UserContext.Provider value={{ user, setUser }}>
//   <Header />
//   <Layout />
//   <Footer />
// </UserContext.Provider>
