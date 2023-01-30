import { useState } from "react";
import TextField from "@mui/material/TextField";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { MessageCard } from "../components/UIkit";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthen } from "../src/reducks/login/loginSlice";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";

const cookie = new Cookie();

export default function Search() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);

  const [main, setMain] = useState("");
  const [booktitle, setBooktitle] = useState("");
  const [author, setAuthor] = useState("");
  const [sub, setSub] = useState("");

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`, {
      method: "POST",
      body: JSON.stringify({
        main: main,
        booktitle: booktitle,
        author: author,
        sub: sub,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    router.push("/");
  };

  const handleChangeMain = (event) => {
    setMain(event.target.value);
  };
  const handleChangeBooktitle = (event) => {
    setBooktitle(event.target.value);
  };
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeSub = (event) => {
    setSub(event.target.value);
  };

  return (
    <Layout title="Search">
      <div className="flex justify-center p-8 bg-stone-50 h-full">
        <div className="flex flex-col w-4/5 max-w-2xl">
          <TextField
            id="filled-multiline-flexible"
            multiline
            minRows={1}
            maxRows={5}
            label="題名"
            variant="standard"
            onChange={handleChangeMain}
          />
          <div className="h-10" />
          <div className=" self-end w-3/5">
            <TextField
              id="filled-multiline-flexible"
              multiline
              minRows={1}
              maxRows={5}
              label="本の名前"
              variant="standard"
              size="small"
              className="  w-full"
              onChange={handleChangeBooktitle}
            />
            <div className="h-4" />
            <TextField
              id="filled-multiline-flexible"
              multiline
              minRows={1}
              maxRows={5}
              label="本の著者"
              variant="standard"
              size="small"
              className=" w-full"
              onChange={handleChangeAuthor}
            />
          </div>
          <div className="h-14" />
          <TextField
            id="filled-multiline-flexible"
            label="内容"
            multiline
            minRows={3}
            maxRows={12}
            value={sub}
            onChange={handleChangeSub}
            variant="filled"
          />
          <div className="h-14" />

          <Button
            variant="outlined"
            className=" w-24 self-center"
            onClick={create}
          >
            作成
          </Button>
        </div>
      </div>
    </Layout>
  );
}
