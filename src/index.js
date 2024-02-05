import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AuctionPage from "./pages/AuctionPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "auctions/:auctionId",
        element: <AuctionPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
]);
const clientId =
  "645813395347-6nr08m7bsffmdu5crv01lsr0lrlisr66.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
