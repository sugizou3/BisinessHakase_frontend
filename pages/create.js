import * as React from "react";
import TextField from "@mui/material/TextField";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { MessageCard } from "../components/UIkit";

export default function Search() {

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Layout title="Search">
      <div className="flex justify-center p-8 bg-stone-50 h-full">
      <div className="flex flex-col w-4/5 max-w-2xl">
        <TextField id="outlined-basic" label="Standard" variant="standard" className="mb-12" />
        <div className=" self-end w-3/5">
        <TextField id="standard-basic" label="Standard" variant="standard" size="small" className="mb-6  w-full" />
        <TextField id="standard-basic" label="Standard" variant="standard" size="small" className="mb-16 w-full" /></div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          minRows={3}
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="filled"
          className="mb-8"
        />
      </div></div>
    </Layout>
  );
}
