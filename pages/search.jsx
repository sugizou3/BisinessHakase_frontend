import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { MessageCard, HeadTag,CheckJWT } from "../components/UIkit";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { getSearch } from "src/reducks/post/postSlice";
import { useState } from "react";
import Input from "@mui/material/Input";
import {
  setSearchText,
  resetSearchText,
  selectSearchText,
  selectProfile,
} from "src/reducks/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Search() {
  const [text, setText] = useState("");
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const myprofile = useSelector(selectProfile);
  var userId = myprofile? myprofile.id : -1;

  useEffect(async () => {
    var searchedPost = await getSearch(searchText,userId);
    const posts = searchedPost?.sort(
      (b, a) => new Date(a.created_on) - new Date(b.created_on)
    );
    setPost(posts);
  }, [searchText]);

  const searchFunc = async (e) => {
    e.preventDefault();
    const main = text;
    post = await getSearch(main);
    setPost(post);
    setText("");
  };

  return (
    <div>
      <HeadTag title="search" />
      <CheckJWT/>
      {post && post.map((post) => <MessageCard key={post.id} post={post} />)}
    </div>
  );
}
