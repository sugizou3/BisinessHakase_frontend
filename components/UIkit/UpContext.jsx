import * as React from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import { ProfileIcon, CommentBox, CommentField } from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProfiles,
  
} from "../../src/reducks/auth/authSlice.js";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {
  postComment,
  getComments,
  setComment,
  selectComments,
} from "src/reducks/post/postSlice";
import useSWR from "swr";

export default function UpContext({ post,comment, open, handleClose, staticComments }) {
  const dispatch = useDispatch();

  const parentEventStopper = (e) => {
    e.stopPropagation();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };

  const timeDiffrence = () => {
    var diff = new Date() - new Date(post.created_on);
    var mes_diff;
    var min = parseInt(diff / 1000 / 60);

    if (min >= 60) {
      var hour = parseInt(min / 60);
      if (hour >= 24) {
        var day = parseInt(hour / 24);
        if (day <= 7) {
          mes_diff = day + "日前";
        } else if (day <= 31) {
          var week = parseInt(day / 7);
          mes_diff = week + "週間前";
        } else if (day <= 365) {
          var month = parseInt(day / 31);
          mes_diff = month + "か月前";
        } else {
          var year = parseInt(day / 365);
          mes_diff = year + "年前";
        }
      } else {
        mes_diff = hour + "時間前";
      }
    } else {
      if (min > 0) {
        mes_diff = min + "分前";
      } else {
        mes_diff = "たった今";
      }
    }
    return mes_diff;
  };

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comment/`;

  const { data: comments, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticComments,
  });

 


  const profiles = useSelector(selectProfiles);

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
          <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-3/5 bg-gray-200 p-8 rounded-2xl h-4/5 overflow-hidden overflow-scroll hidden-scrollbar hidden-scrollbar::-webkit-scrollbar">
            <CardHeader
              avatar={<ProfileIcon profile={prof} />}
              action={
                <div>
                  <IconButton
                    onClick={parentEventStopper}
                    aria-label="add to favorites"
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={parentEventStopper} aria-label="share">
                    <DownloadIcon />
                  </IconButton>
                </div>
              }
              title={prof.nickName}
              subheader={timeDiffrence()}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.main}
              </Typography>
              <div className="float-right mt-2">
                <Typography variant="body2" color="text.secondary">
                  {post.booktitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.author}
                </Typography>
              </div>
            </CardContent>
            <CardContent className="mt-10">
              <Typography paragraph>
                {post.sub}
                {[...new Array(1)]
                  .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                  )
                  .join("\n")}
              </Typography>
            </CardContent>
            <CardContent className="mt-3">
              <Typography paragraph>10件のコメント</Typography>
              <CommentField postId={post.id} />
              {comments &&
                comments.map((comment) => (
                  <CommentBox profile = {null} key={comment.id} text={comment.text} />//
                ))}
                
            </CardContent>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export async function getStaticProps() {
  const staticComments = await getComments();
  return { props: { staticComments }, revalidate: 3 };
}
