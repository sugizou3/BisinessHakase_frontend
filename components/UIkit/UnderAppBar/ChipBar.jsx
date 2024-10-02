import * as React from "react";
import { ChipTag } from "..";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Divider from "@mui/material/Divider";
import { selectSearchInfo } from "src/reducks/searchInfo/searchInfoSlice";
import { selectProfile } from "src/reducks/auth/authSlice";
import { useSelector } from "react-redux";
import { selectDictionary } from "src/reducks/dictionary/dictionarySlice";

export default function ChipBar() {
  const searchInfo = useSelector(selectSearchInfo);
  const myprofile = useSelector(selectProfile);
  const dictionary = useSelector(selectDictionary);

  // const searchHistory = searchInfo.filter((info) => {
  //   return info.user === myprofile.id;
  // });
  var searchHistory = [];
  var displayHistory = [];
  // for(var i=0;i < searchInfo.length;i++){
  //   if (info.user==myprofile.id){

  //   }
  // }
  searchInfo.forEach((info) => {
    if (info.user == myprofile.id) {
      searchHistory.push(info);
    }
  });

  const filteredSearchHistory = searchHistory?.sort(
    (b, a) => new Date(a.searched_on) - new Date(b.searched_on)
  );
  const displayLimit = 2;

  filteredSearchHistory.forEach((info) => {
    var diff = new Date() - new Date(info.searched_on);
    var week = diff / 1000 / 60 / 24 / 7;
    var count = 0;
    const tagNum = 13;

    if (
      ((week < 2 && info.count > displayLimit) ||
        (week > 2 && info.count > week)) &&
      count < tagNum
    ) {
      displayHistory.push(info);
      count += 1;
    }
  });

  var texts = [];
  for (var i = 0; i < displayHistory.length; i++) {
    for (var j = 0; j < dictionary.length; j++) {
      if (displayHistory[i].text[0] == dictionary[j].id) {
        texts.push(dictionary[j].text);
      }
    }
  }

  return (
    <div className="flex items-center py-2 px-4 overflow-x-scroll  hidden-scrollbar hidden-scrollbar::-webkit-scrollbar whitespace-nowrap scroll-touch ">
      <div className="flex items-center sm_NoneDisplay ">
        <ChipTag label="ホーム" href="/" menu={true}>
          <HomeIcon color="action" />
        </ChipTag>
        <ChipTag label="検索" href="/search" menu={true}>
          <SearchIcon color="action" />
        </ChipTag>
        <ChipTag label="作成" href="/create" menu={true}>
          <BorderColorIcon color="action" />
        </ChipTag>
        <ChipTag label="マイページ" href="/mypage" menu={true}>
          <MenuBookIcon color="action" />
        </ChipTag>
        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
      </div>
      {texts &&
        texts.map((text, index) => <ChipTag key={index} label={text} />)}
    </div>
  );
}
