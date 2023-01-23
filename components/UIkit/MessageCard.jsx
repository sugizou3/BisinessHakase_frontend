import React, { useState, useEffect } from "react";
import Link from "next/link";
// import {styled} from 'styled-component';
import { styled as muiStyled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import { useLongPress } from ".";

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

export default function MessageCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  const parentEventStopper = (e) => {
    e.stopPropagation();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onLongPress = () => {
  };

  const Click = () => {
    handleExpandClick()
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };


  const timeDiffrence = () => {
    var diff = new Date() - new Date( post.created_on);
    var mes_diff;
    var min = parseInt(diff/1000/60);

    if (min>=60) {
      var hour = parseInt(min/60);
      if (hour>=24) {
        var day = parseInt(hour/24);
        if (day<=7) {
          mes_diff = day + "日前";
        }else if(day<=31) {
          var week = parseInt(day/7);
          mes_diff = week + "周間前"
        }else if (day<=365) {
          var month = parseInt(day/31);
          mes_diff = month + "か月前"
        }else{
          var year = parseInt(day/365);
          mes_diff = year + "年前"
        }
      }else{
        mes_diff = hour + "時間前";
      }
    }else{
      if (min>0) {
        mes_diff = min + "分前";
      }else{
        mes_diff ="たった今"
      }
    }
    return mes_diff;
    
  }
  
  

  const longPressEvent = useLongPress(onLongPress, Click, defaultOptions);

  useEffect(() => {}, []);

  return (
    <div className="-mb-16">
      <Link href={`/posts/${post.id}/`}>
      <Card className={expanded ? "showContent test " : "hideContent test"}>
        <CardHeader
          avatar={
            <Avatar  aria-label="recipe">
              R
            </Avatar>
          }
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
          title={ post.userPost }
          subheader={ timeDiffrence() }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          { post.main }
          </Typography>
          <div className="float-right mt-2">
            <Typography variant="body2" color="text.secondary">
            { post.booktitle }
            </Typography>
            <Typography variant="body2" color="text.secondary">
            { post.author }
            </Typography>
          </div>
        </CardContent>
        <CardContent className="mt-10">
          <Typography paragraph>
          { post.sub }
          </Typography>
          <div className=" w-full h-10"></div>
        </CardContent>
      </Card></Link>
      <div className=" w-full h-20  text-center relative bottom-20 z-10 gradientWhite" {...longPressEvent}>
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
