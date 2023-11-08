import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, Route, Routes } from "react-router-dom";
import Device from "./DeviceComponent";
import Certificate from "./Tekvz";
import DevicesIcon from "@mui/icons-material/Devices";

function SideBarComponent() {
  const CertificateList = () => {
    return (
      <>
        <div>
          <h1>CERTIFICATION LIST</h1>
        </div>

        <Certificate />
      </>
    );
  };

  const DeviceList = () => {
    return (
      <>
        <h1>INFRASTRUCTURE LIST</h1>
        <Device />
      </>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          {/* <MenuItem className="menu1" icon={<MenuRoundedIcon />}> */}
            <h2> Tekvizion TEC</h2>
          {/* </MenuItem> */}
          <MenuItem
            component={<Link to="CertificateList" className="link" />}
            icon={<GridViewRoundedIcon />}
          >
            {" "}
            Certifications{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="DeviceList" className="link" />}
            icon={<DevicesIcon />}
          >
            {" "}
            Infrastructure{" "}
          </MenuItem>
        </Menu>
      </Sidebar>

      <section>
        <Routes>
          <Route path="CertificateList" element={<CertificateList />} />
          <Route path="DeviceList" element={<DeviceList />} />
        </Routes>
      </section>
    </div>
  );
}

export default SideBarComponent;
