import React, { useState, useEffect } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
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
  fetchAsyncGetProfs,
  selectProfile,
} from "../../src/reducks/auth/authSlice.js";
import {
  fetchAsyncPatchLiked,
  selectPostEditState,
  setPostEditState,
  resetPostEditState,
} from "src/reducks/post/postSlice";

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

const RotationSettings = muiStyled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ editState, theme }) => ({
  transform: !editState ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MessageCard({ post, comments }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const editState = useSelector(selectPostEditState);

  const handleEditClick = async () => {
      await dispatch(setPostEditState());
  };

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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = async () => {
    setOpen(false);
    await dispatch(resetPostEditState());
};

  return (
    <div className="-mb-16">
      <UpContext
        post={post}
        key={post.id}
        comments={comments}
        open={open}
        setOpen = {setOpen}
        handleClose={handleClose}
      />
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
              {myprofile.id == post.userPost ? (
                <RotationSettings
                  editState={editState}
                  aria-edit={editState}
                  aria-label="show more"
                  onClick={handleEditClick}
                >
                  <SettingsIcon fontSize="large" />
                </RotationSettings>
              ) : (
                <div></div>
              )}
            </div>
          }
          title={prof ? prof.nickName : ""}
          subheader={dateFunction(post.created_on)}
        />
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
            lineHeight={1.6}
            paragraph
            className="whitespace-pre-wrap"
          >
            {" "}
            {post.sub}
          </Typography>
          <div className=" w-full h-10"></div>
        </CardContent>
      </Card>
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
