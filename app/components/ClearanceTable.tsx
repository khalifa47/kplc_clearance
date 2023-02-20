"use client";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { createDataAdmin, createDataEmployee } from "@/utils/createData";
import Row from "./Row";
import SearchBar from "./SearchBar";
import DepartmentsTable from "./DepartmentsTable";

// const rowsAdmin = [
//   createDataAdmin("John Doe", "pending", "20 Dec 2022", [
//     {
//       department: "ICT",
//       status: "pending",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//     {
//       department: "Finance",
//       status: "progress",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//   ]),
//   createDataAdmin("Jack Doe", "approved", "20 Dec 2022", [
//     {
//       department: "ICT",
//       status: "approved",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//     {
//       department: "Finance",
//       status: "approved",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//   ]),
//   createDataAdmin("Jill Doe", "pending", "20 Dec 2022", [
//     {
//       department: "ICT",
//       status: "pending",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//     {
//       department: "Finance",
//       status: "pending",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//   ]),
//   createDataAdmin("Johcrecn Doevthy", "progress", "20 Dec 2022", [
//     {
//       department: "ICT",
//       status: "progress",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//     {
//       department: "Finance",
//       status: "approved",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//   ]),
//   createDataAdmin("Jane Doe", "progress", "20 Dec 2022", [
//     {
//       department: "ICT",
//       status: "progress",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//     {
//       department: "Finance",
//       status: "progress",
//       certifier: "certifier",
//       date: "21 Dec 2022",
//     },
//   ]),
// ];

export default function ClearanceTable({
  userType,
  clearance,
}: {
  userType: "admin" | "employee";
  clearance: Clearance;
}) {
  console.log(clearance);
  return (
    <>
      <Toolbar />
      <TableContainer component={Paper} elevation={2}>
        {userType === "admin" ? (
          <Table>
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
              {/* {rowsAdmin.map((row) => (
                <Row key={row.user} row={row} />
              ))} */}
            </TableBody>
          </Table>
        ) : (
          <DepartmentsTable departments={clearance.DepartmentClearance} />
        )}
      </TableContainer>
    </>
  );
}
