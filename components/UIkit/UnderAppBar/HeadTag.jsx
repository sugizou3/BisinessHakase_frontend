
import Head  from "next/head";

export default function HeadTag({title="default title"}) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
  );
}
