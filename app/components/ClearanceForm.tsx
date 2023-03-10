"use client";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/utils/helpers";

const ClearanceForm = ({
  uid,
  name,
  roleId,
}: {
  uid: string;
  name: string;
  roleId: number;
}) => {
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
        {roleId === 5 ? (
          <Button variant="contained" size="large" onClick={handleClearance}>
            Request Clearance
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={() => router.replace("/admin")}
          >
            Go to Admin Dashboard
          </Button>
        )}
      </Box>
    </>
  );
};

export default ClearanceForm;
