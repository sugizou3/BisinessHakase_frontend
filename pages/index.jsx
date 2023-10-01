import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { MessageCard, CheckJWT, HeadTag } from "../components/UIkit";
import { getAllPostsData } from "../lib/posts";
import useSWR from "swr";
import { setPost } from "../src/reducks/post/postSlice";
import { useDispatch } from "react-redux";

import { getComments, setComment } from "src/reducks/post/postSlice";
import {
  fetchAsyncGetProfs,
  resetMyprofile,
  editNickname,
  // selectDictionary,
  // fetchAsyncGetDictionary,
} from "src/reducks/auth/authSlice";
import {
  selectDictionary,
  fetchAsyncGetDictionary,
} from "src/reducks/dictionary/dictionarySlice";

const fetcher = (url) => fetch(url).then((res) => res.json());

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`;
const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

export default function Home({ staticfilteredPosts, staticComments }) {
  const dispatch = useDispatch();
  const getProf = async () => {
    await dispatch(fetchAsyncGetProfs());
    await dispatch(fetchAsyncGetDictionary());
  };

  const { data: posts } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilteredPosts,
  });
  const filteredPosts = posts?.sort(
    (b, a) => new Date(a.created_on) - new Date(b.created_on)
  );

  const { data: comments } = useSWR(apiUrlComment, fetcher, {
    fallbackData: staticComments,
  });

  const filteredComment = comments?.sort(
    (b, a) => new Date(a.created_on) - new Date(b.created_on)
  );

  useEffect(() => {
    const posts = [...filteredPosts];
    const comments = [...filteredComment];
    getProf();
    dispatch(setPost(posts));
    dispatch(setComment(comments));
  }, []);
  // console.log(comments);

  // useEffect(() => {
  //   var existJWT = checkJWT();
  //   if (existJWT) {
  // } else {
  //   dispatch(resetMyprofile())
  // }
  // }, []);

  return (
    <div>
      <HeadTag title="Home" />
      <CheckJWT />
      {filteredPosts &&
        filteredPosts.map((post) => (
          <MessageCard
            key={post.id}
            post={post}
            comments={filteredComment.filter((comment) => {
              return post.id === comment.post;
            })}
          />
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const staticfilteredPosts = await getAllPostsData();
  const staticComments = await getComments();
  return { props: { staticfilteredPosts, staticComments }, revalidate: 3 };
}
