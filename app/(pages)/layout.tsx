"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <html>
      <head />
      <body>
        <div style={{ display: "flex" }}>
          <Header
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Sidebar
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          {children}
        </div>
      </body>
    </html>
  );
};

export default HomeLayout;
