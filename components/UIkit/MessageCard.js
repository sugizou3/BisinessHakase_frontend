import React, { useState, useEffect } from "react";
// import {styled} from 'styled-component';
import { styled as muiStyled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";

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

const check_sec = 500; //ミリ秒
const target_element = document.getElementsByClassName("test");

function long_press(el, nf, lf, sec) {
  let longclick = false;
  let longtap = false;
  let touch = false;
  let timer;
  el.addEventListener("touchstart", () => {
    touch = true;
    longtap = false;
    timer = setTimeout(() => {
      longtap = true;
      lf();
    }, sec);
  });
  el.addEventListener("touchend", () => {
    if (!longtap) {
      clearTimeout(timer);
      nf();
    } else {
      touch = false;
    }
  });

  el.addEventListener("mousedown", () => {
    if (touch) return;
    longclick = false;
    timer = setTimeout(() => {
      longclick = true;
      lf();
    }, sec);
  });
  el.addEventListener("click", () => {
    if (touch) {
      touch = false;
      return;
    }
    if (!longclick) {
      clearTimeout(timer);
      nf();
    }
  });
}

export default function MessageCard() {
  const [expanded, setExpanded] = useState(false);
  function normal_func() {
    setExpanded(!expanded);
  }
  function long_func() {
    // setExpanded(!expanded);
  }

  useEffect(() => {
    long_press(target_element, normal_func, long_func, check_sec);
  }, []);

  const parentEventStopper = (e) => {
    e.stopPropagation();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={handleExpandClick}>
      <Card className={expanded ? "showContent test " : "hideContent test"}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            世界一わかりやすいお金の話世界一わかりやすいお金の話世界一わかりやすいお金の話世界一わかりやすいお金の話世界一わかりやすいお金の話世界一わかりやすいお金の話世界一わかりやすいお金の話
          </Typography>
          <div className="float-right mt-2">
            <Typography variant="body2" color="text.secondary">
              世界一わかりやすいお金の話
            </Typography>
            <Typography variant="body2" color="text.secondary">
              山田隆
            </Typography>
          </div>
        </CardContent>
        <CardContent className="mt-10">
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
          <div className=" w-full h-10"></div>
        </CardContent>
      </Card>
      <div className=" w-full h-20  text-center relative bottom-20 z-10 gradientWhite">
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
