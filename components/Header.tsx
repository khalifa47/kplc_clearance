"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Image from "next/image";

const Header = ({
  drawerWidth,
  handleDrawerToggle,
}: {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    console.log("logged out");
  };

  const settings = [
    {
      name: "Account",
      icon: <AccountCircleIcon />,
      action: handleCloseUserMenu,
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      action: logOut,
    },
  ];

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        position: "fixed",
        left: { md: `${drawerWidth}px` },
        background: "white",
        color: "black",
        maxHeight: "65px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
          }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Image
              src="/kplc.png"
              alt="logo"
              width={50}
              height={50}
              style={{
                margin: 10,
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Open settings" placement="bottom-start">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt={userName} src={userPhoto} /> */}
                  <Avatar>K</Avatar>
                </IconButton>
              </Tooltip>
              <Typography ml={1}>Khalifa Fumo</Typography>
            </Box>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.action}>
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ mx: 2 }}>{setting.name}</Typography>
                  </ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
