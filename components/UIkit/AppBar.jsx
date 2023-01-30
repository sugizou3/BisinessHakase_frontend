import { SearchComponent } from "./index.jsx";
import { ProRegIcon } from ".";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image'



export default function AppBar() {
  
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
