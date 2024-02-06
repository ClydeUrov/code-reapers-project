import { Route, Routes } from "react-router-dom";
import { UserContext } from "./helpers/Context";
import { useState } from "react";
import { getUsetLS } from "./helpers/localStorage";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AuctionPage from "./pages/AuctionPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState(getUsetLS());
  const clientId = "645813395347-6nr08m7bsffmdu5crv01lsr0lrlisr66.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/auction/:auctionId" element={<AuctionPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
      {/* <ToastContainer
        autoClose={3000}
        position="top-center"
        stacked
        closeButton={() => <CloseButtonIcon />}
        style={{
          borderRadius: "2rem",
        }}
      /> */}
    </GoogleOAuthProvider>
  );
}

export default App;

// <UserContext.Provider value={{ user, setUser }}>
//   <Header />
//   <Layout />
//   <Footer />
// </UserContext.Provider>