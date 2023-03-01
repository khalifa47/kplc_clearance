"use client";

import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import DepartmentsTable from "./DepartmentsTable";

const ClearanceTable = ({
  clearance,
  items,
}: {
  clearance: Clearance;
  items: Item[];
}) => {
  return (
    <>
      <Toolbar />
      <TableContainer component={Paper} elevation={2}>
        <DepartmentsTable
          departments={clearance.DepartmentClearance}
          items={items}
        />
      </TableContainer>
    </>
  );
};

export default ClearanceTable;
