import * as React from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncPatchLiked,
  fetchPostStart,
  fetchPostEnd,
} from "src/reducks/post/postSlice";
import { selectProfile,setOpenModal,isLoggedInOff } from "src/reducks/auth/authSlice";

export default function FavoriteCheckBox({ post }) {
  const dispatch = useDispatch();

  const myprofile = useSelector(selectProfile);

  const favoriteIconFunc = async (e) => {
    e.stopPropagation();
    var packet = {
      id: post.id,
      main: post.main,
      booktitle: post.booktitle,
      author: post.author,
      sub: post.sub,
      current: post.good,
      new: myprofile.id,
      word:post.word
    };
    console.log(post.good);

    await dispatch(fetchPostStart());
    let test = await dispatch(fetchAsyncPatchLiked(packet));
    if (test.meta.requestStatus == 'rejected') {
      dispatch(setOpenModal())
      dispatch(isLoggedInOff())
    }
    await dispatch(fetchPostEnd());
  };


  return (
    <Checkbox
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      checked={post.good.some((good) => good === myprofile.id)}
      onClick={favoriteIconFunc}
    />
  );
}
