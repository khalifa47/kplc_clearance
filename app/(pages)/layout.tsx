"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import { SessionProvider, signIn } from "next-auth/react";
import type { Session } from "next-auth";

const HomeLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if (session == null) {
    signIn();
  }
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          <div style={{ display: "flex" }}>
            {session && (
              <>
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
              </>
            )}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
