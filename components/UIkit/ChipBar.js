import * as React from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";




export default function ChipBar () {
    return (
        <div className="flex items-center px-2 py-2 px-4 space-x-3 select-none overflow-x-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          <Link href="signup/">
            <Chip label="python" variant="outlined" className="font-Roboto font-medium text-sm bg-gray-600" />
          </Link>
          <Link href="signup/">
            <Chip label="音楽" variant="filled" className="font-Roboto font-medium text-sm border-gray-600" />
          </Link>
          <Link href="signup/">
            <Chip label="ゲーム" variant="filled" className="font-Roboto font-medium text-sm" />
          </Link>
          <Link href="signup/">
            <Chip label="アニメーション" variant="filled" className="font-Roboto font-medium text-sm" />
          </Link>
          <Link href="signup/">
            <Chip label="ライブ" variant="filled" className="font-Roboto font-medium text-sm" />
          </Link>
        </div>
    );
}