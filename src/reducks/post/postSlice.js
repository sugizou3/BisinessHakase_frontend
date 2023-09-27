import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const apiUrlPost = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`;
const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;
const apiUrlProfile = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profile/`;
const apiUrlSearch = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/search/`;

export const fetchAsyncGetPosts = createAsyncThunk("post/get", async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(apiUrlPost, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(apiUrlPost, {
      headers: {
        //Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
  // const res = await axios.get(apiUrlPost, {
  //   headers: {
  //     Authorization: `JWT ${localStorage.localJWT}`,
  //   },
  // });
  // return res.data;
});

export const fetchAsyncNewPost = createAsyncThunk(
  "post/post",
  async (newPost) => {
    const uploadData = new FormData();
    uploadData.append("main", newPost.main);
    uploadData.append("booktitle", newPost.booktitle);
    uploadData.append("author", newPost.author);
    uploadData.append("sub", newPost.sub);

    const res = await axios.post(apiUrlPost, uploadData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncPatchLiked = createAsyncThunk(
  "post/patch",
  async (good) => {
    const currentGood = good.current;
    const uploadData = new FormData();

    let isOverlapped = false;
    currentGood.forEach((current) => {
      //　すでにいいねを押されている投稿はtrueになってappendされず配列から消える　押されていない新規投稿はfalseで追加していく
      if (current === good.new) {
        isOverlapped = true;
      } else {
        uploadData.append("good", String(current));
      }
    });

    if (!isOverlapped) {
      uploadData.append("good", String(good.new));
    } else if (currentGood.length === 1) {
      uploadData.append("main", good.main);
      uploadData.append("booktitle", good.booktitle);
      uploadData.append("author", good.author);
      uploadData.append("sub", good.sub);
      uploadData.append("word", good.word);
      const res = await axios.put(`${apiUrlPost}${good.id}/`, uploadData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    }
    const res = await axios.patch(`${apiUrlPost}${good.id}/`, uploadData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetComments = createAsyncThunk(
  "comment/get",
  async () => {
    const res = await axios.get(apiUrlComment, {
      headers: {
        //Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncPostComment = createAsyncThunk(
  "comment/post",
  async (comment) => {
    const res = await axios.post(apiUrlComment, comment, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoadingPost: false,
    openNewPost: false,
    posts: [
      {
        id: 0,
        main: "",
        booktitle: "",
        author: "",
        sub: "",
        userPost: 0,
        created_on: "",
        good: [0],
      },
    ],
    comments: [
      {
        id: 0,
        text: "",
        userComment: 0,
        post: 0,
        created_on: "",
      },
    ],
  },
  reducers: {
    fetchPostStart(state) {
      state.isLoadingPost = true;
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false;
    },
    setOpenNewPost(state) {
      state.openNewPost = true;
    },
    resetOpenNewPost(state) {
      state.openNewPost = false;
    },
    setPost(state, action) {
      return {
        ...state,
        posts: action.payload,
      };
    },
    setComment(state, action) {
      //let state = {...state}
      return {
        ...state,
        comments: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    });
    builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    });
  },
});

export const {
  fetchPostStart,
  fetchPostEnd,
  setOpenNewPost,
  resetOpenNewPost,
  setPost,
  setComment,
} = postSlice.actions;

export const selectIsLoadingPost = (state) => state.post.isLoadingPost;
export const selectOpenNewPost = (state) => state.post.openNewPost;
export const selectPosts = (state) => state.post.posts;
export const selectComments = (state) => state.post.comments;

export default postSlice.reducer;

export const getComments =
  ("comment/get",
  async () => {
    const res = await axios.get(apiUrlComment, {
      headers: {
        //Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    const comment = res.data;
    return comment;
  });

export const postComment =
  ("comment/post",
  async (comment) => {
    await axios.post(apiUrlComment, comment, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
  });

  export const getSearch =
  ("search/get",
  async (main) => {
    const res = await axios.get(`${apiUrlSearch}?main=${main}`, {
      headers: {
        //Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    const result = res.data;
    return result;
  });

export const asyncPatchLiked = createAsyncThunk("post/patch", async (good) => {
  const currentGood = good.current;
  const renewGood = [];
  const uploadData = new FormData();

  let isOverlapped = false;
  currentGood.forEach((current) => {
    //　すでにいいねを押されている投稿はtrueになってappendされず配列から消える　押されていない新規投稿はfalseで追加していく
    if (current === good.new) {
      isOverlapped = true;
    } else {
      renewGood.push(current); //uploadData.append("good", String(current));
    }
  });

  if (!isOverlapped) {
    renewGood.push(good.new); //uploadData.append("good", String(good.new));
  } else if (currentGood.length === 1) {
    const post = {
      id: good.id,
      //userPost:good.userPost,
      main: good.main,
      booktitle: good.booktitle,
      author: good.author,
      sub: good.sub,
      good: [],
    };
    const res = await axios.put(`${apiUrlPost}${good.id}/`, post, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }

  const post = {
    id: good.id,
    //userPost:good.userPost,
    main: good.main,
    booktitle: good.booktitle,
    author: good.author,
    sub: good.sub,
    good: renewGood,
  };
  const res = await axios.patch(`${apiUrlPost}${good.id}/`, uploadData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncPatchDownload = createAsyncThunk(
  "post/patch",
  async (download) => {
    const currentDownload = download.current;
    const uploadData = new FormData();

    let isOverlapped = false;
    currentDownload.forEach((current) => {
      //　すでにいいねを押されている投稿はtrueになってappendされず配列から消える　押されていない新規投稿はfalseで追加していく
      if (current === download.new) {
        isOverlapped = true;
      } else {
        uploadData.append("download", String(current));
      }
    });

    if (!isOverlapped) {
      uploadData.append("download", String(download.new));
    } else if (currentDownload.length === 1) {
      uploadData.append("nickName", download.nickName);
      //uploadData.append("img", download.img);
      const res = await axios.put(
        `${apiUrlProfile}${download.id}/`,
        uploadData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    }
    const res = await axios.patch(
      `${apiUrlProfile}${download.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
