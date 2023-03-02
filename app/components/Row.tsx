"use client";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";

import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/utils/helpers";

const Row = ({ row, items }: { row: Clearance; items: Item[] }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const rowStatus: any = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  const handleClearanceApproval = async () => {
    fetch(`/api/clearances/${row.userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ clearanceId: row.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    router.refresh();
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
        <TableCell align="center">{dateFormat(row.createdAt)}</TableCell>
        <TableCell align="center">{rowStatus[row.status.name]}</TableCell>
        <TableCell
          align="right"
          sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          {row.status.name === "progress" && (
            <IconButton color="primary" onClick={handleClearanceApproval}>
              <CheckIcon />
            </IconButton>
          )}
        </TableCell>
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
