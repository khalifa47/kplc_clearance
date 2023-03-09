"use client";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/utils/helpers";

const ClearanceForm = ({ uid, name }: { uid: string; name: string }) => {
  const router = useRouter();

  const handleClearance = async () => {
    fetch(`/api/clearances/${uid}`, {
      method: "POST",
    })
      .then(async (response) => {
        if (response.ok) {
          await sendEmail(name, uid, [
            "kplc.hr.admin@yopmail.com",
            "kplc.finance.admin@yopmail.com",
            "kplc.ict.admin@yopmail.com",
          ]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    router.refresh();
  };
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" size="large" onClick={handleClearance}>
          Request Clearance
        </Button>
      </Box>
    </>
  );
};

export default ClearanceForm;
