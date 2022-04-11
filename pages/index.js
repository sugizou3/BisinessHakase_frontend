import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { MessageCard, IconMenu, ChipBar, AppBar } from "../components/UIkit";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white divide-y border-b fixed inset-x-0 z-10">
        <AppBar />
        <ChipBar />
      </header>

      <div className="px-3 pt-24 bg-gray-100 h-full w-full flex fixed  justify-between">
        <div className="pt-6  bg-white minWidth-leftContent  h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          22222
          <IconMenu />
        </div>
        <div className="pt-6 bg-white w-full mx-2  h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          77777
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </div>
        <div className="pt-6 bg-white minWidth-rightContent  h-full overflow-y-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar ">
          333333
          <div className="h-48 bg-gray-300 my-5"></div>
          <div className="h-24 bg-gray-300 my-5"></div>
          <div className="h-48 bg-gray-300 my-5"></div>
          <div className="h-24 bg-gray-300 my-5"></div>
          <div className="h-24 bg-gray-300 my-5"></div>
          <div className="h-48 bg-gray-300 my-5"></div>
        </div>
      </div>
    </div>
  );
}
