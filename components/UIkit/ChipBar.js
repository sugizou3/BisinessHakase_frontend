import * as React from "react";
import Link from "next/link";
import { Chip } from "./";

export default function ChipBar() {
  return (
    <div className="flex items-center px-6 py-2 px-4 space-x-3 overflow-x-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
      <Chip name="python" />
      <Chip name="javascript" />
      <Chip name="数学" />
      <Chip name="音楽" />
      <Chip name="アニメーション" />
      <Chip name="その他" />
      <Chip name="ゲーム" />
      <Chip name="ビジュアルアート" />
      <Chip name="コンテンツ" />
      <Chip name="デート" />
      <Chip name="ライブ" />
      <Chip name="ミックス" />
      
      
    </div>
  );
}
