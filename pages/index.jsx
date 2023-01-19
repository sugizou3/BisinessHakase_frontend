import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { MessageCard } from "../components/UIkit";
import { getAllPostsData } from "../lib/posts";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`;

export default function Home({ staticfilteredPosts }) {
  const { data: posts, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilteredPosts,
  });
  const filteredPosts = posts?.sort(
    (b, a) => new Date(a.created_on) - new Date(b.created_on)
  );
  useEffect(() => {
    mutate();
  }, []);


  return (
    <Layout title="Home">
      {filteredPosts &&
        filteredPosts.map((post) => <MessageCard key={post.id} post={post} />)}
    </Layout>
  );
}

export async function getStaticProps() {
  const staticfilteredPosts = await getAllPostsData();
  return { props: { staticfilteredPosts }, revalidate: 3 };
}
