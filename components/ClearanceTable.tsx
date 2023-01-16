"use client";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createData } from "@/utils/createData";
import Row from "./Row";
import SearchBar from "./SearchBar";

const rows = [
  createData("John Doe", "pending", "20 Dec 2022", [
    {
      department: "ICT",
      status: "pending",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
    {
      department: "ICT",
      status: "progress",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
  ]),
  createData("Jack Doe", "approved", "20 Dec 2022", [
    {
      department: "ICT",
      status: "approved",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
    {
      department: "ICT",
      status: "approved",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
  ]),
  createData("Jill Doe", "pending", "20 Dec 2022", [
    {
      department: "ICT",
      status: "pending",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
    {
      department: "ICT",
      status: "pending",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
  ]),
  createData("Johcrecn Doevthy", "progress", "20 Dec 2022", [
    {
      department: "ICT",
      status: "progress",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
    {
      department: "ICT",
      status: "approved",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
  ]),
  createData("Jane Doe", "progress", "20 Dec 2022", [
    {
      department: "ICT",
      status: "progress",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
    {
      department: "ICT",
      status: "progress",
      certifier: "certifier",
      date: "21 Dec 2022",
    },
  ]),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ "& > *": { border: "unset" } }}>
            <TableCell colSpan={3}>
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
          {rows.map((row) => (
            <Row key={row.user} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
