import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function IconMenu() {
  return (
    <Paper  className="xl:w-80 max-w-full w-24 " >
      <MenuList>
        <Link href="/">
          <div className=" font-NotoSansJP  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
            <div className="text-center ">
              <HomeIcon color="action" className=" mx-4 mb-1 " />
            </div>
            <div className="text-center text-sm">ホーム</div>
          </div>
        </Link>
        <Link href="search/">
          <div className=" font-NotoSansJP  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
          <div className="text-center "><SearchIcon color="action" className="mx-4 mb-1 " /></div>
            
            <div className="text-center text-sm">検索</div>
          </div>
        </Link>
        <Link href="create/">
          <div className=" font-NotoSansJP  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
          <div className="text-center "><BorderColorIcon color="action" className="mx-4 mb-1 " /></div>
            
            <div className="text-center text-sm">作成</div>
          </div>
        </Link>
        <Link href="mypage/">
          <div className=" font-NotoSansJP  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
          <div className="text-center "><MenuBookIcon color="action" className="mx-4 mb-1 " /></div>
            
            <div className="text-center text-sm">マイページ</div>
          </div>
        </Link>
        <Divider className=" " />
        <Link href="signup/">
          <div className=" font-NotoSansJP  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
          <div className="text-center "><SearchIcon color="action" className="mx-4 mb-1 " /></div>
            
            <div className="text-center text-sm">検索</div>
          </div>
        </Link>
      </MenuList>
    </Paper>
  );
}
