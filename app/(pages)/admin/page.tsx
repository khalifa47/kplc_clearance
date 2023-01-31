"use client";

import ClearanceTable from "@/app/components/ClearanceTable";
import Toolbar from "@mui/material/Toolbar";

export default function Dashboard() {
  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      <Toolbar />
      <ClearanceTable userType="admin" />
    </main>
  );
}
