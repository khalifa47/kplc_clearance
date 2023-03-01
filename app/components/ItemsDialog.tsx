"use client";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import CloseIcon from "@mui/icons-material/Close";
import { TableContainer } from "@mui/material";
import { capitalize } from "@/utils/helpers";

const ItemsDialog = ({
  dept,
  items,
  dialogOpen,
  handleDialogClose,
}: {
  dept: string;
  items: Item[];
  dialogOpen: boolean;
  handleDialogClose: () => void;
}) => {
  return (
    <Dialog fullScreen open={dialogOpen} onClose={handleDialogClose}>
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
            {dept} ITEMS
          </Typography>
        </Toolbar>
      </AppBar>
      {items.length === 0 ? (
        <h1 style={{ padding: 20, textAlign: "center" }}>No items found</h1>
      ) : (
        <TableContainer sx={{ p: 2 }}>
          <Table sx={{ boxShadow: 4, borderRadius: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: 16 }}
                  align="center"
                >
                  Serial
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: 16 }}
                  align="center"
                >
                  Item Category
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: 16 }}
                  align="center"
                >
                  Item
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: 16 }}
                  align="center"
                >
                  Assigned On
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: 16 }}
                  align="center"
                >
                  Returned On
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#afafaf",
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {item.item.id}
                  </TableCell>
                  <TableCell align="center">
                    {capitalize(item.item.itemCategory.name)}
                  </TableCell>
                  <TableCell align="center">
                    {capitalize(item.item.name)}
                  </TableCell>
                  <TableCell align="center">{item.assignedOn}</TableCell>
                  <TableCell align="center">
                    {item.returnedOn ? item.returnedOn : "Not Returned"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Dialog>
  );
};

export default ItemsDialog;
