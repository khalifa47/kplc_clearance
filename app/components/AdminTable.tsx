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
import TablePagination from "@mui/material/TablePagination";
import Row from "./Row";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { searchClearancesByUser } from "@/utils/helpers";

const AdminTable = ({
  clearances,
  items,
}: {
  clearances: Clearance[];
  items: Item[];
}) => {
  // pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // search states
  const [shownClearances, setShownClearances] = useState(clearances);
  const [search, setSearch] = useState("");

  // search functions
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchedClearances = searchClearancesByUser(clearances, search);
    setShownClearances(searchedClearances);
  };

  // pagination functions
  const handlePaginationChange = (e: unknown, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
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
              <TableCell colSpan={10}>
                <SearchBar
                  search={search}
                  handleChangeSearch={handleChangeSearch}
                  handleSearch={handleSearch}
                />
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
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
                align="center"
              >
                Region
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
                align="center"
              >
                Division
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
            {shownClearances.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ fontSize: 20 }}>
                  No user found
                </TableCell>
              </TableRow>
            ) : (
              shownClearances
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((clearance) => (
                  <Row
                    key={clearance.id}
                    row={clearance}
                    items={items.filter(
                      (item) => item.user?.id === clearance.user.id
                    )}
                  />
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={shownClearances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePaginationChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default AdminTable;
