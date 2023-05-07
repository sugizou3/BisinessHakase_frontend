// import { useEffect } from "react";
// import "tailwindcss/tailwind.css";
// import Layout from "../components/Layout";
// import { MessageCard } from "../components/UIkit";
// import { getAllPostsData } from "../lib/posts";
// import useSWR from "swr";
// import { setPost } from "../src/reducks/post/postSlice";
// import { useDispatch } from "react-redux";

// import { getComments, setComment } from "src/reducks/post/postSlice";
// import { fetchAsyncGetProfs } from "src/reducks/auth/authSlice";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`;
// const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

// export default function testUI({ staticfilteredPosts, staticComments }) {
//   const dispatch = useDispatch();
//   const getProf = async () => {
//     await dispatch(fetchAsyncGetProfs());
//   }

//   const { data: posts } = useSWR(apiUrl, fetcher, {
//     fallbackData: staticfilteredPosts,
//   });
//   const filteredPosts = posts?.sort(
//     (b, a) => new Date(a.created_on) - new Date(b.created_on)
//   );

//   const { data: comments } = useSWR(apiUrlComment, fetcher, {
//     fallbackData: staticComments,
//   });

//   const filteredComment = comments?.sort(
//     (b, a) => new Date(a.created_on) - new Date(b.created_on)
//   );


//   useEffect(() => {
//     const posts = [...filteredPosts];
//     console.log("pass");
//     const comments = [...filteredComment];
//     getProf()
//     dispatch(setPost(posts));
//     dispatch(setComment(comments));
//   }, [filteredPosts,filteredComment]);

//   return (
//     <Layout title="Home">
//       {filteredPosts &&
//         filteredPosts.map((post) => (
//           <MessageCard
//             key={post.id}
//             post={post}
//             comments={filteredComment.filter((comment) => {
//               return post.id === comment.post;
//             })}
//           />
//         ))}
//     </Layout>
//   );
// }

// export async function getStaticProps() {
//   const staticfilteredPosts = await getAllPostsData();
//   const staticComments = await getComments();
//   return { props: { staticfilteredPosts, staticComments }, revalidate: 3 };
// }
