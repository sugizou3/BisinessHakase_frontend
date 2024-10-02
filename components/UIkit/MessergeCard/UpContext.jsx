import * as React from "react";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  ProfileIcon,
  CommentBox,
  CommentField,
  dateFunction,
  FavoriteCheckBox,
  DownloadCheckBox,
  SearchWordBox,
} from "..";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";
import {
  getComments,
  fetchAsyncPatchLiked,
  fetchAsyncUpdatePost,
  fetchPostStart,
  fetchPostEnd,
  selectPostEditState,
  textToId,
} from "src/reducks/post/postSlice";
import { selectProfile, selectProfiles } from "src/reducks/auth/authSlice";
import { comment } from "postcss";
import { PresentToAllTwoTone } from "@mui/icons-material";

export default function UpContext({
  post,
  comments,
  open,
  setOpen,
  handleClose,
}) {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

  // const { data: comments, mutate } = useSWR(apiUrl, fetcher, {
  //   fallbackData: staticComments,
  // });
  const dispatch = useDispatch();
  const router = useRouter();
  const profiles = useSelector(selectProfiles);
  const myprofile = useSelector(selectProfile);
  const editState = useSelector(selectPostEditState);

  const [main, setMain] = useState("");
  const [booktitle, setBooktitle] = useState("");
  const [author, setAuthor] = useState("");
  const [sub, setSub] = useState("");
  const [word, setWord] = useState("");

  const checkCommentUser = (userCommentId) => {
    let profile = profiles.filter((prof) => {
      return prof.userProfile === userCommentId;
    });
    return profile[0];
  };

  const prof_array = profiles.filter((prof) => {
    return prof.userProfile === post.userPost;
  });
  const prof = prof_array[0];

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    setMain(post.main);
    setBooktitle(post.booktitle);
    setAuthor(post.author);
    setSub(post.sub);
    setWord(post.word);
  }, []);

  const update = async (e) => {
    e.preventDefault();
    const packet = {
      id: post.id,
      main: main,
      booktitle: booktitle,
      author: author,
      sub: sub,
      word: word,
    };
    setOpen(false);
    console.log("tetete");
    await dispatch(fetchPostStart());
    // await dispatch(fetchAsyncNewPost(packet));
    await dispatch(fetchAsyncUpdatePost(packet));
    await dispatch(fetchPostEnd());
    // router.push("/");
  };

  const favoriteIconFunc = async () => {
    //e.stopPropagation();
    var packet = {
      id: post.id,
      main: post.main,
      booktitle: post.booktitle,
      author: post.author,
      sub: post.sub,
      current: post.good,
      new: myprofile.id,
    };

    // const packet = {
    //   ...post,
    //   current: post.good,
    //   new: myprofile.id,
    // };
    const goodInfo = { current: post.good, new: myprofile.id };

    await dispatch(fetchPostStart());
    //await dispatch(asyncPatchLiked(packet));
    await dispatch(fetchAsyncPatchLiked(packet));
    await dispatch(fetchPostEnd());
  };

  const handleChangeMain = (event) => {
    setMain(event.target.value);
  };
  const handleChangeBooktitle = (event) => {
    setBooktitle(event.target.value);
  };
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeSub = (event) => {
    setSub(event.target.value);
  };
  const deleteWord = (id) => {
    var result = word.filter((item) => {
      return item != id;
    });
    setWord(result);
  };
  const setFunc = (array) => {
    setWord(array);
  };

  const addWord = async (text) => {
    var id = await textToId(text);
    console.log(id[0]);
    var result = [...word, id[0]];
    setFunc(result);
    // setWord((preState) => [...preState, id[0]]);
    // console.log([...word,id[0]]);
    // console.log(word);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 minWidth-Modal w-3/5 bg-gray-200 sm:p-8 p-4 rounded-2xl h-4/5 overflow-hidden overflow-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar">
            <CardHeader
              avatar={<ProfileIcon profile={prof} />}
              action={
                <div>
                  <FavoriteCheckBox post={post} />
                  <DownloadCheckBox post={post} />
                </div>
              }
              title={prof ? prof.nickName : ""}
              subheader={dateFunction(post.created_on)}
            />
            {editState ? (
              <div className="flex flex-col mx-3">
                <TextField
                  id="filled-multiline-flexible"
                  defaultValue={post.main}
                  multiline
                  minRows={1}
                  maxRows={5}
                  label="題名"
                  variant="standard"
                  onChange={handleChangeMain}
                />
                <div className="h-10" />
                <div className=" self-end w-3/5">
                  <TextField
                    id="filled-multiline-flexible"
                    defaultValue={post.booktitle}
                    multiline
                    minRows={1}
                    maxRows={5}
                    label="本の名前"
                    variant="standard"
                    size="small"
                    className="  w-full"
                    onChange={handleChangeBooktitle}
                  />
                  <div className="h-4" />
                  <TextField
                    id="filled-multiline-flexible"
                    defaultValue={post.author}
                    multiline
                    minRows={1}
                    maxRows={5}
                    label="本の著者"
                    variant="standard"
                    size="small"
                    className=" w-full"
                    onChange={handleChangeAuthor}
                  />
                </div>
                <div className="h-14" />
                <TextField
                  id="filled-multiline-flexible"
                  defaultValue={post.sub}
                  label="内容"
                  multiline
                  minRows={3}
                  maxRows={12}
                  // value={sub}
                  onChange={handleChangeSub}
                  variant="filled"
                />
                <div className="h-14" />
                <SearchWordBox
                  postWords={word}
                  deleteWord={deleteWord}
                  addWord={addWord}
                />
                <div className="mt-6 self-center">
                  <Button variant="contained" onClick={update}>
                    更新
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", letterSpacing: 2 }}
                    className="whitespace-pre-wrap"
                  >
                    {post.main}
                  </Typography>
                  <div className="float-right mt-2">
                    <Typography variant="body2" color="text.secondary">
                      {post.booktitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="float-right"
                    >
                      {post.author}
                    </Typography>
                  </div>
                </CardContent>
                <CardContent className="mt-10">
                  <Typography
                    lineHeight={1.7}
                    paragraph
                    className="whitespace-pre-wrap"
                  >
                    {" "}
                    {post.sub}
                  </Typography>
                  <div className=" w-full h-10"></div>
                </CardContent>
                <SearchWordBox
                  postWords={word}
                  deleteWord={deleteWord}
                  addWord={addWord}
                />
                <CommentField postId={post.id} />
                {comments &&
                  comments.map((comment, index) => (
                    <CommentBox key={index} comment={comment} />
                  ))}
                {/* <CommentBox comment={comments}/> */}
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
