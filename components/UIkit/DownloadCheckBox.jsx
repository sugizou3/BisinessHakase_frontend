import * as React from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPatchDownload } from "src/reducks/post/postSlice";
import { selectProfile } from "src/reducks/auth/authSlice";

export default function DownloadCheckBox({ post }) {
  const dispatch = useDispatch();

  const myprofile = useSelector(selectProfile);

  const DownloadIconFunc = async () => {
    //e.stopPropagation();
    var packet = {
      id: myprofile.id,
      nickName: myprofile.nickName,
      //img: myprofile.img,
      current: myprofile.download,
      new: post.id,
    };

    console.log("yyyy");

    // const packet = {
    //   ...profile,
    //   current: profile.good,
    //   new: myprofile.id,
    // };
    await dispatch(fetchAsyncPatchDownload(packet));
  };

  // useEffect(() => {
  //   console.log(myprofile);
  // }, [myprofile]);

  return (
    <Checkbox
      icon={<DownloadIcon />}
      checkedIcon={<FileDownloadDoneIcon />}
      checked={myprofile?.download.some((download) => download === myprofile.id)}
      onChange={DownloadIconFunc}
    />
  );
}
