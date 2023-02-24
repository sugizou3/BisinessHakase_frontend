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
import { ProfileIcon, useLongPress, UpContext } from ".";
import { useSelector, useDispatch } from "react-redux";
import { selectProfiles } from "../../src/reducks/auth/authSlice.js";

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



export default function MessageCard({ post,comment }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const parentEventStopper = (e) => {
    e.stopPropagation();
  };

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

  const longPressEvent = useLongPress(onLongPress, Click, defaultOptions);


  const profiles = useSelector(selectProfiles);

  const prof_array = profiles.filter((prof) => {
    return prof.userProfile === post.userPost;
  });
  const prof = prof_array[0];

 

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const UpContextClose = useCallback(() => {
  //   handleClose();
  // }, [open]);

  return (
    <div className="-mb-16">
      <UpContext post={post} comment={comment} open={open} handleClose={handleClose} />
      {/* <Link href={`/posts/${post.id}/`} passHref> */}
      <Card
        className={expanded ? "showContent test " : "hideContent test"}
        onClick={handleOpen}
      >
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
