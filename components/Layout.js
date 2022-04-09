import Head from "next/head";

export default function Layout({ children, title = "Default title" }) {
    return (
      <div>
        <Head>
          <title>title</title>
        </Head>
      </div>
    );
  }