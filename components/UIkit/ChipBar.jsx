import * as React from "react";
import Link from "next/link";
import { ChipTag } from ".";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Divider from "@mui/material/Divider";

export default function ChipBar() {
  return (
    <div className="flex items-center py-2 px-4 overflow-x-scroll  hidden-scrollbar hidden-scrollbar::-webkit-scrollbar whitespace-nowrap scroll-touch ">
      <div className="flex items-center sm_NoneDisplay ">
        <ChipTag label="ホーム" href="/">
          <HomeIcon color="action" />
        </ChipTag>
        <ChipTag label="検索" href="/search" >
          <SearchIcon color="action" />
        </ChipTag>
        <ChipTag label="作成" href="/create">
          <BorderColorIcon color="action" />
        </ChipTag>
        <ChipTag label="マイページ" href="/mypage">
          <MenuBookIcon color="action" />
        </ChipTag>
        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
      </div>
      <ChipTag label="python" />
      <ChipTag label="javascript" />
      <ChipTag label="数学" />
      <ChipTag label="音楽" />
      <ChipTag label="アニメーション" />
      <ChipTag label="その他" />
      <ChipTag label="ゲーム" />
      <ChipTag label="ビジュアルアート" />
      <ChipTag label="コンテンツ" />
      <ChipTag label="デート" />
      <ChipTag label="ライブ" />
      <ChipTag label="ミックス" />
    </div>
  );
}
