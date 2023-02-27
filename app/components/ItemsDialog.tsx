"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const ItemsDialog = ({
  dialogOpen,
  handleDialogClose,
}: {
  dialogOpen: boolean;
  handleDialogClose: () => void;
}) => {
  return (
    <Dialog fullWidth open={dialogOpen} onClose={handleDialogClose}>
      <AppBar
        sx={{ position: "relative", background: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Items
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};

export default ItemsDialog;
