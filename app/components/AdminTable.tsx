"use client";

import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Row from "./Row";
import SearchBar from "./SearchBar";

const AdminTable = ({ clearances }: { clearances: Clearance[] }) => {
  return (
    <>
      <Toolbar />
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& > *": { border: "unset" } }}>
              <TableCell colSpan={4}>
                <Typography variant="h5" fontWeight={600}>
                  Clearances
                </Typography>
              </TableCell>
              <TableCell>
                <SearchBar />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Staff ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Date Initiated
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clearances.map((clearance) => (
              <Row key={clearance.id} row={clearance} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTable;
