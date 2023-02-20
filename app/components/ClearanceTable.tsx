"use client";

import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import DepartmentsTable from "./DepartmentsTable";

const ClearanceTable = ({ clearance }: { clearance: Clearance }) => {
  return (
    <>
      <Toolbar />
      <TableContainer component={Paper} elevation={2}>
        <DepartmentsTable departments={clearance.DepartmentClearance} />
      </TableContainer>
    </>
  );
};

export default ClearanceTable;
