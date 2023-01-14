"use client";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import NotesIcon from "@mui/icons-material/Notes";
import Image from "next/image";

const Sidebar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}: {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) => {
  const categories = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Clearances",
      icon: <NotesIcon />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Image
          src="/kplc.png"
          alt="logo"
          width={100}
          height={100}
          style={{
            margin: 20,
          }}
        />
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {categories.map((category) => (
            <ListItemButton
              onClick={() => console.log(category.name)}
              key={category.name}
            >
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            // background: "rgba(230, 62, 0, 1)",
            // color: "white",
            // "& svg": { color: "white" },
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            // background: "rgba(230, 62, 0, 1)",
            // borderRight: "none",
            // color: "white",
            // "& svg": { color: "white" },
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
