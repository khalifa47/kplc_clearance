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
import { dateFormat, capitalize } from "@/utils/helpers";
import { useSession } from "next-auth/react";

const Row = ({ row, items }: { row: Clearance; items: Item[] }) => {
  const [status, setStatus] = useState(row.status.name);

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const rowStatus = {
    pending: <Chip label="Pending" color="error" />,
    progress: <Chip label="In Progress" color="warning" />,
    approved: <Chip label="Approved" color="success" />,
  };

  const handleClearanceApproval = async () => {
    await fetch(`/api/clearances/${row.userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ clearanceId: row.id }),
    })
      .then((res) => setStatus("approved"))
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <TableCell align="center">{row.userId}</TableCell>
        <TableCell align="center">
          {`${row.user.firstName} ${row.user.lastName}`}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {capitalize(row.user.region.name)}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.user.department.name.toUpperCase()}
        </TableCell>
        <TableCell align="center">{dateFormat(row.createdAt)}</TableCell>
        <TableCell align="center">{rowStatus[status]}</TableCell>
        <TableCell
          align="right"
          sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          {status === "progress" && session?.user.roleId === 1 && (
            <IconButton color="primary" onClick={handleClearanceApproval}>
              <CheckIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {/* Sub Table */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DepartmentsTable
              userRole={session?.user.role?.name}
              userToBeCleared={`${row.user.firstName} ${row.user.lastName}`}
              departments={row.DepartmentClearance}
              items={items}
              small
              handleOverallClearance={() => setStatus("progress")}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
