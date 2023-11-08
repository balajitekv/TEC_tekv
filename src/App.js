import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./App.css";
import SideBar from "./Components/SideBarComponent";

function App() {
  return (
    <React.StrictMode>
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>
    </React.StrictMode>
  );
}

export default App;
