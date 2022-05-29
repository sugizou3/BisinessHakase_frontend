import fetch from "node-fetch";

export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  const filteredPost = posts.sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on)
  );
  return filteredPost;
}

export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id) {
  if (id == "search" || id == "create" || id == "mypage" || id == "signup" ) {
    return;
  }

  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}`)
  );
  const post = await res.json();
  return {
    post,
  };
}
