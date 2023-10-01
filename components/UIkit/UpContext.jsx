import * as React from "react";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  ProfileIcon,
  CommentBox,
  CommentField,
  dateFunction,
  FavoriteCheckBox,
  DownloadCheckBox,
  SearchWordBox,
} from ".";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {
  getComments,
  fetchAsyncPatchLiked,
  fetchPostStart,
  fetchPostEnd,
} from "src/reducks/post/postSlice";
import { selectProfile, selectProfiles } from "src/reducks/auth/authSlice";
import { comment } from "postcss";

export default function UpContext({ post, comments, open, handleClose }) {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

  // const { data: comments, mutate } = useSWR(apiUrl, fetcher, {
  //   fallbackData: staticComments,
  // });

  const profiles = useSelector(selectProfiles);
  const myprofile = useSelector(selectProfile);

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

  // useEffect(() => {
  //   console.log(post.good);
  // }, [post]);

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
          title={prof? prof.nickName:"" }
          subheader={dateFunction(post.created_on)}
        />
        <CardContent>
          <Typography variant="h6"  sx={{ fontWeight: 'bold' ,letterSpacing: 2 }} className="whitespace-pre-wrap" >
            {post.main}
          </Typography>
          <div className="float-right mt-2">
            <Typography variant="body2" color="text.secondary" >
              {post.booktitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author}
            </Typography>
          </div>
        </CardContent>
        <CardContent className="mt-10">
          <Typography lineHeight={1.7} paragraph className="whitespace-pre-wrap">    {post.sub}</Typography>
          <div className=" w-full h-10"></div>
        </CardContent>
        <SearchWordBox postWords={post.word}/>
        <CommentField postId={post.id}/>
        {comments &&
        comments.map((comment) => (
          <CommentBox comment={comment}/>
        ))}
        {/* <CommentBox comment={comments}/> */}
        
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

