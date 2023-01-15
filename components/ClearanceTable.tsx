"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createData } from "@/utils/createData";
import Row from "./Row";

const rows = [
  createData("John Doe", "progress", "20 Dec 2022", [
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
  createData("John Doe", "progress", "20 Dec 2022", [
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
  createData("John Doe", "progress", "20 Dec 2022", [
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
  createData("John Doe", "progress", "20 Dec 2022", [
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
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 600 }} align="center">
              User
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Date Initiated
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
