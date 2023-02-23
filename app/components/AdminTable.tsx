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
import Pagination from "@mui/material/Pagination";
import Row from "./Row";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminTable = ({
  clearances,
  startPage,
  count,
}: {
  clearances: Clearance[];
  startPage: number;
  count: number;
}) => {
  const router = useRouter();
  const [page, setPage] = useState(startPage);

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    router.push(`/admin?page=${value}`);
  };

  return (
    <>
      <Toolbar />
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
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
        <Pagination
          count={Math.ceil(count / 3.0)}
          color="primary"
          size="large"
          page={page}
          sx={{ p: 2, m: "0 auto" }}
          onChange={handlePaginationChange}
        />
      </TableContainer>
    </>
  );
};

export default AdminTable;
