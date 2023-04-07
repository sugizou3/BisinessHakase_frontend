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
import { selectProfile } from "src/reducks/auth/authSlice";

export default function FavoriteCheckBox({ post }) {
  const dispatch = useDispatch();

  const myprofile = useSelector(selectProfile);

  const favoriteIconFunc = async () => {
    //e.stopPropagation();
    var packet = {
      id: post.id,
      main: post.main,
      booktitle: post.booktitle,
      author: post.author,
      sub: post.sub,
      current: post.good,
      new: myprofile.id,
    };

    console.log("tttt");

    // const packet = {
    //   ...post,
    //   current: post.good,
    //   new: myprofile.id,
    // };
    const goodInfo = { current: post.good, new: myprofile.id };

    await dispatch(fetchPostStart());
    //await dispatch(asyncPatchLiked(packet));
    await dispatch(fetchAsyncPatchLiked(packet));
    await dispatch(fetchPostEnd());
  };

  // useEffect(() => {
  //   console.log(post.good);
  // }, [post]);

  return (
    <Checkbox
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      checked={post.good.some((good) => good === myprofile.id)}
      onChange={favoriteIconFunc}
    />
  );
}
