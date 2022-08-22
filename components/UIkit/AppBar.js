import { SearchComponent } from "./index.js";
import { ProRegIcon } from "./";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";


const cookie = new Cookie();

export default function AppBar() {
  const router = useRouter();
  const dispatch = useDispatch();


  return (
    <div className="flex justify-between items-center h-14 mx-4">
      <div className="-ml-3">
        <img
          className="h-8 w-8 ml-3"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </div>
      <div className="flex items-center justify-center flex-grow h-10">
        <SearchComponent />
      </div>
      <ProRegIcon/>
    </div>
  );
}
