"use client";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import Chip from "@mui/material/Chip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { createData } from "@/utils/createData";

const Row = ({ row }: { row: ReturnType<typeof createData> }) => {
  const [open, setOpen] = useState(false);
  const rowStatus = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.user}
        </TableCell>
        <TableCell align="center">{rowStatus[row.status]}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
      </TableRow>

      {/* Sub Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                component="div"
              >
                Departments Status
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Department
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Status
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Certified By
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.departmentStatuses.map((departmentsStatus) => (
                    <TableRow key={departmentsStatus.department}>
                      <TableCell component="th" scope="row" align="center">
                        {departmentsStatus.department}
                      </TableCell>
                      <TableCell align="center">
                        {rowStatus[departmentsStatus.status]}
                      </TableCell>
                      <TableCell align="center">
                        {departmentsStatus.certifier}
                      </TableCell>
                      <TableCell align="center">
                        {departmentsStatus.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
