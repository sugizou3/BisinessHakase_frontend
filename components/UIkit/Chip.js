import * as React from "react";
import Link from "next/link";

export default function Chip({ name = "" }) {
  return (
    <Link href="/">
      <div className="font-Roboto font-medium text-sm border border-stone-300 bg-stone-100 hover:bg-stone-200 rounded-full px-3 h-8 flex items-center cursor-pointer min-w-max select-none">
        {/* <div className="font-Roboto font-medium text-sm border border-black bg-black text-white rounded-full px-3 h-8 flex items-center cursor-pointer select-none"> */}
        {name}
      </div>
    </Link>
  );
}
