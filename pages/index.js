import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { MessageCard } from "../components/UIkit";
import { getAllPostsData } from "../lib/posts";

export default function Home({ filteredPosts }) {
  return (
    <Layout title="Home">
      {filteredPosts &&
        filteredPosts.map((post) => <MessageCard key={post.id} post={post} />)}
    </Layout>
  );
}

export async function getStaticProps() {
  const filteredPosts = await getAllPostsData();
  return { props: { filteredPosts } };
}
