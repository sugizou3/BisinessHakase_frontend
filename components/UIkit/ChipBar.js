import * as React from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";

export default function ChipBar() {
  return (
    <div className="flex items-center px-2 py-2 px-4 space-x-3 overflow-x-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-black bg-black text-white rounded-full px-3 h-8 flex items-center">
          python
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          javascript
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          アニメーション
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          数学
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          音楽
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
      <Link href="/">
        <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center min-w-max">
          ライブ
        </div>
      </Link>
    </div>
  );
}
