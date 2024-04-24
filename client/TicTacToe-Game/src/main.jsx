import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "../components/Temp-Files/Temp-Login.jsx";
import Home from "../components/Temp-Files/Temp-Home.jsx";

const router = createBrowserRouter([
  {
    path: "/login-temp",
    element: <Login />,
    // loader: () => {
    //   if (localStorage.access_token) {
    //     return redirect("/");
    //   }
    //   return null;
    // },
  },
  {
    path: "/chat-temp",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
  </React.StrictMode>
);
