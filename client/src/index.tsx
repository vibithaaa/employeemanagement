import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import App from "./App";
import ReactDOM from 'react-dom/client';



const root =ReactDOM.createRoot(
  document.getElementById("root")as HTMLElement
);
root.render(
  <BrowserRouter>
  <UserProvider>
    <App/>
  </UserProvider>
  </BrowserRouter>
);