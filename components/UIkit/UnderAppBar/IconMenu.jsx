import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import Typography from '@mui/material/Typography';

export default function IconMenu() {
  return (
    <Paper className="xl:w-80 max-w-full w-24 ">
      <MenuList>
        <Link href="/" passHref>
          <div className="   axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
            <div className="text-center ">
              <HomeIcon color="action" className=" mx-4 mb-1 " />
            </div>
            <Typography className="text-center " gutterBottom>ホーム</Typography>
          </div>
        </Link>
        <Link href="/search" passHref>
          <div className="  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
            <div className="text-center ">
              <SearchIcon color="action" className="mx-4 mb-1 " />
            </div>

            <Typography className="text-center " gutterBottom>検索</Typography>
          </div>
        </Link>
        <Link href="/create" passHref>
          <div className="  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
            <div className="text-center ">
              <BorderColorIcon color="action" className="mx-4 mb-1 " />
            </div>

            <Typography className="text-center " gutterBottom>作成</Typography>
          </div>
        </Link>
        <Link href="/mypage" passHref>
          <div className="  axisXCenterBreakpoint  h-16 hover:bg-stone-100 flex xl:h-12  xl:items-center ">
            <div className="text-center ">
              <MenuBookIcon color="action" className="mx-4 mb-1 " />
            </div>

            <Typography className="text-center " gutterBottom>マイページ</Typography>
          </div>
        </Link>
      </MenuList>
    </Paper>
  );
}
