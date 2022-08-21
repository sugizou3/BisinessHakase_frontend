import { useState } from "react";
import TextField from "@mui/material/TextField";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { MessageCard } from "../components/UIkit";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthen } from "../src/reducks/login/loginSlice";

export default function Search() {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {authen.email ? (
        <Layout title="Search">
          <div className="flex justify-center p-8 bg-stone-50 h-full">
            <div className="flex flex-col w-4/5 max-w-2xl">
              <TextField
                id="outlined-basic"
                label="題名"
                variant="standard"
                className="mb-12"
              />
              <div className=" self-end w-3/5">
                <TextField
                  id="standard-basic"
                  label="本の名前"
                  variant="standard"
                  size="small"
                  className="mb-6  w-full"
                />
                <TextField
                  id="standard-basic"
                  label="本の著者"
                  variant="standard"
                  size="small"
                  className="mb-16 w-full"
                />
              </div>
              <TextField
                id="filled-multiline-flexible"
                label="内容"
                multiline
                minRows={3}
                maxRows={12}
                value={value}
                onChange={handleChange}
                variant="filled"
                className="mb-16"
              />

              <Button
                variant="outlined"
                className="flex mb-16 w-24 self-center"
              >
                Contained
              </Button>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout title="Search">
          <Link href="signup/">
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ fontWeight: "bold", width: 90 }}
              className="flex items-center "
            >
              ログイン
            </Button>
          </Link>
        </Layout>
      )}
    </>
  );
}
