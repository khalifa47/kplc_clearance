"use client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LoginSharp from "@mui/icons-material/LoginSharp";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";

const validationSchema = yup.object({
  staff_id: yup.string().required("Staff ID is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: { staff_id: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn("credentials", {
          ...values,
          redirect: true,
          callbackUrl: "/",
        });

        // dispatch(setUser(JSON.stringify(user)));
      } catch (err) {
        console.error(err);
        // toast({ msg: err.message });
      }
    },
  });

  return (
    <Paper elevation={5} sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Image src="/kplc.png" alt="logo" width={100} height={100} priority />
        <Typography variant="h6" fontWeight={600} mt={1}>
          THE KPLC CLEARANCE SYSTEM
        </Typography>
      </Box>

      <Box component="form">
        <TextField
          size={"small"}
          type={"string"}
          name={"staff_id"}
          label="Staff ID"
          fullWidth
          required
          placeholder={"Staff ID"}
          value={formik.values.staff_id}
          error={formik.touched.staff_id && Boolean(formik.errors.staff_id)}
          helperText={formik.touched.staff_id && formik.errors.staff_id}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <TextField
          size={"small"}
          type={"password"}
          name={"password"}
          label="Password"
          fullWidth
          required
          placeholder={"Password"}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{ my: 1 }}
        />
        <Button
          fullWidth
          size="small"
          color="primary"
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            formik.submitForm();
          }}
          endIcon={<LoginSharp />}
          variant="contained"
          sx={{ my: 1 }}
        >
          Log In
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
