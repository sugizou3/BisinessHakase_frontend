import * as React from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";




export default function ChipBar () {
    return (
        <div className="flex items-center px-2 py-2 px-4 space-x-3 select-none overflow-x-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar">
          <Link href="signup/">
            <Chip label="Chip Outlined" variant="outlined" />
          </Link>
          <Link href="signup/">
            <Chip label="Chip Outlined" variant="outlined" />
          </Link>
          <Link href="signup/">
            <Chip label="Chip Outlined" variant="outlined" />
          </Link>
          <Link href="signup/">
            <Chip label="Chip Outlined" variant="outlined" />
          </Link>
          <Link href="signup/">
            <Chip label="Chip Outlined" variant="outlined" />
          </Link>
        </div>
    );
}