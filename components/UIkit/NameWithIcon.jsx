import "tailwindcss/tailwind.css";
import { ProfileIcon } from "./index";
import { useSelector } from "react-redux";
import * as React from "react";
import {
  selectProfile,
} from "src/reducks/auth/authSlice.js";
import Typography from "@mui/material/Typography";

export default function NameWithIcon() {
  const myProf = useSelector(selectProfile);
  return (
      <div className="flex flex-col items-center mt-5">
        <ProfileIcon scale={120} />
        <Typography sx={{mt:1}} >{myProf.nickName}</Typography>
      </div>
  );
}
