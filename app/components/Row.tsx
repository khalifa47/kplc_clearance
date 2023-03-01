"use client";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";

const Row = ({ row, items }: { row: Clearance; items: Item[] }) => {
  const [open, setOpen] = useState(false);
  const rowStatus: any = {
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
          {row.userId}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {`${row.user.firstName} ${row.user.lastName}`}
        </TableCell>
        <TableCell align="center">{row.createdAt}</TableCell>
        <TableCell align="center">{rowStatus[row.status.name]}</TableCell>
      </TableRow>

      {/* Sub Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DepartmentsTable
              departments={row.DepartmentClearance}
              items={items}
              small
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
