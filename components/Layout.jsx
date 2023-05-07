import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import {
  MessageCard,
  IconMenu,
  ChipBar,
  AppBar,
  RightContent,
  CheckJWT,
} from "./UIkit";
import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedInOn,
  isLoggedInOff,
  selectIsLoggedIn,
  fetchAsynkVerify,
  fetchAsynkRefresh,
  selectVerifyState,
} from "src/reducks/auth/authSlice";

export default function Layout({ children, title = "Default title" }) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const verifyStates = useSelector(selectVerifyState);
  // const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   console.log("enter useLayoutEffect");
  //   if (isLoggedIn) {
  //     console.log(isLoggedIn + "isLoggedIn");
  //     var existJWT = true//CheckJWT();
  //     // isLoggedInがTrueで JWTがある
  //     if (existJWT) {
  //       console.log("go verify");
  //       dispatch(fetchAsynkVerify());

  //       if (!verifyStates) {
  //         console.log("refresh");
  //         dispatch(fetchAsynkRefresh());
  //       }
  //     }
  //     // isLoggedInはTrueだが JWTがない
  //     else {
  //       // ログインページへ遷移
  //       // isLoggedInをfalseに
  //       console.log("トークンなし");
  //       alert("ログインしてください");
  //       dispatch(isLoggedInOff());
  //     }
  //   }
  // }, []);

  return (
    <div>
      <CheckJWT/>

      <header className="bg-white divide-y border-b fixed inset-x-0 z-10">
        <AppBar />
        <ChipBar />
      </header>

      <div className=" pt-24 bg-stone-50 h-full w-full flex fixed  justify-between">
        <div className="pt-2  bg-white minWidth-leftContent  h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar sm_max_NoneDisplay">
          <IconMenu />
        </div>
        <div className="pt-2 bg-white w-full mx-2  h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          {children}
        </div>
        <div className="pt-2 bg-white lg:minWidth-rightContent lg_NoneDisplay h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          {/* <div className=" my-3">
            <iframe
              width="320px"
              height="200px"
              src="https://www.youtube.com/embed/-YnrfwLp-YI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
              allowfullscreen
            ></iframe>
          </div>
          <div className=" my-3">
            <iframe
              width="320px"
              height="200px"
              src="https://www.youtube.com/embed/5fReO4IzjmY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className=" my-3">
            <iframe
              width="320px"
              height="200px"
              src="https://www.youtube.com/embed/Bsxd86uvDKw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className=" my-3">
            <iframe
              width="320px"
              height="200px"
              src="https://www.youtube.com/embed/OzG6dhszgrg"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className=" my-3">
            <iframe
              width="320px"
              height="200px"
              src="https://www.youtube.com/embed/FIWRtYfGZyU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div> */}
          <RightContent />
        </div>
      </div>
    </div>
  );
}
