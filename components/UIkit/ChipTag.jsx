import * as React from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";
import {
  setSearchText,
  resetSearchText,
  selectSearchText,
} from "src/reducks/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ChipTag({ label = "",href="search/", children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const searchFunc = async (text) => {
    // e.preventDefault();
    dispatch(setSearchText(text));
    router.push("/search");
  };


  return (
    <div className="pr-3">
      {/* <Link href={href} passHref> */}
      <div>
        {children ? (
          <Chip
            icon={children}
            label={label}
            sx={{ pl: 0.7, pr: 0.4, py: 0.2, fontSize: 15 }}
            onClick={() => searchFunc(label)}
          />
        ) : (
          <Chip
            label={label}
            sx={{ px: 0.4, py: 0.2, fontSize: 15 }}
            onClick={() => searchFunc(label)}
          />
        )}
      {/* </Link> */}
      </div>
    </div>
  );
}
