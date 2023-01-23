"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Roboto } from "@next/font/google";
import { useState } from "react";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <html lang="en">
      <head />
      <body className={roboto.className} style={{ display: "flex" }}>
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
      </body>
    </html>
  );
}
