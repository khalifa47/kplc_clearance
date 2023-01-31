"use client";

import ClearanceTable from "@/components/ClearanceTable";
import ClearanceForm from "@/components/ClearanceForm";
import Toolbar from "@mui/material/Toolbar";

const hasClearance = true;

export default function Dashboard() {
  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      <Toolbar />
      {hasClearance ? (
        <ClearanceTable userType="employee" />
      ) : (
        <ClearanceForm />
      )}
    </main>
  );
}
