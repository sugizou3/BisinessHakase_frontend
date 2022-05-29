import "tailwindcss/tailwind.css";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { useRouter } from "next/router";
import { MessageCard } from "../../components/UIkit";

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback || !post) {
    return (
      <Layout title="isLoading">
        <div>isLoading</div>
      </Layout>
    );
  }
  return (
    <Layout title={post.main}>
      <MessageCard key={post.id} post={post} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { post: post } = (await getPostData(params.id)) || {};
  return {
    props: {
      post,
    },
    revalidate: 3,
  };
}
