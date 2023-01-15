"use client";

import ClearanceTable from "@/components/ClearanceTable";
import Toolbar from "@mui/material/Toolbar";

export default function Dashboard() {
  return (
    <main style={{ flexGrow: 1, padding: 10 }}>
      <Toolbar />
      <ClearanceTable />
    </main>
  );
}
