import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

export default function test() {

  return (
    <Layout title="Search">
      <Stack direction="row" alignItems="center" spacing={2}>
        
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Stack>
    </Layout>
  );
}
