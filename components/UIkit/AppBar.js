import * as React from "react";
import Button from "@mui/material/Button";
import { SearchComponent } from "./index.js";
import Link from "next/link";

export default function AppBar() {
  return (
    <div className="flex justify-between items-center h-14 mx-4">
      <div className="-ml-3">
        <img
          className="h-8 w-8 ml-3"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </div>
      <div className="flex items-center justify-center flex-grow h-10">
        <SearchComponent />
      </div>

      <Link href="signup/">
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ fontWeight: "bold", width:90 }}
          className="flex items-center "
        >
          ログイン
        </Button>
      </Link>
    </div>
  );
}
