"use client";

import Box from "@mui/material/Box";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <Box
        sx={{
          background:
            "linear-gradient(to bottom right, #0c3577, #fece00) center center/cover no-repeat fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        component="body"
      >
        {children}
      </Box>
    </html>
  );
}
