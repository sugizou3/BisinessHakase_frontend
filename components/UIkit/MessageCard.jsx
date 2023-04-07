import React, { useState, useEffect, useCallback } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import {
  ProfileIcon,
  useLongPress,
  UpContext,
  dateFunction,
  FavoriteCheckBox,
  DownloadCheckBox,
} from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProfiles,
  selectProfile,
  fetchAsyncGetProfs,
} from "../../src/reducks/auth/authSlice.js";
import { fetchAsyncPatchLiked } from "src/reducks/post/postSlice";

const ExpandMore = muiStyled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MessageCard({ post, comments }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  



  useEffect(() => {
    async () => {
      await dispatch(fetchAsyncGetProfs());
    };
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onLongPress = () => {};

  const Click = () => {
    handleExpandClick();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };

  const longPressEvent = useLongPress(onLongPress, Click, defaultOptions);

  const profiles = useSelector(selectProfiles);
  const myprofile = useSelector(selectProfile);

  const prof_array = profiles.filter((prof) => {
    return prof.userProfile === post.userPost;
  });
  var prof = prof_array[0];

  // if (prof == undefined) {
  //   prof = {
  //     id: 0,
  //     nickName: "user",
  //     userProfile: 0,
  //     created_on: "",
  //     img: "",
  //     download: [],
  //   };
  // }
  

  const favoriteIconFunc = async (e) => {
    e.stopPropagation();
    var packet = {
      id: post.id,
      main: post.main,
      booktitle: post.booktitle,
      author: post.author,
      sub: post.sub,
      current: post.good,
      new: myprofile.id,
    };
    // console.log("click");
    await fetchAsyncPatchLiked(packet);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div className="-mb-16">
      <UpContext
        post={post}
        key={post.id}
        comments={comments}
        open={open}
        handleClose={handleClose}
      />
      {/* <Link href={`/posts/${post.id}/`} passHref> */}
      <Card
        className={expanded ? "showContent test " : "hideContent test"}
        onClick={handleOpen}
      >
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
          <Typography paragraph>{post.sub}</Typography>
          <div className=" w-full h-10"></div>
        </CardContent>
      </Card>
      {/* </Link> */}
      <div
        className=" w-full h-20  text-center relative bottom-20 z-10 gradientWhite"
        {...longPressEvent}
      >
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          className="relative top-9"
        >
          <ExpandMoreIcon sx={{ fontSize: 30 }} />
        </ExpandMore>
      </div>
    </div>
  );
}
