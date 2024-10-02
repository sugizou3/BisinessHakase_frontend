import "tailwindcss/tailwind.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import { selectPosts } from "src/reducks/post/postSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateIcon from "@mui/icons-material/Create";
import DownloadIcon from "@mui/icons-material/Download";
import { MessageCard } from "../index";
import PropTypes from "prop-types";

import { selectProfile, selectProfiles } from "src/reducks/auth/authSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabGroup() {
  const userProf = useSelector(selectProfiles);
  const myProf = useSelector(selectProfile);
  const posts = useSelector(selectPosts);

  const myPosts = posts.filter((post) => post.userPost == myProf.userProfile);
  const goodPosts = posts.filter((post) => post.good.includes(myProf.id));
  const downloadPosts = posts.filter(
    (post) => post.download == myProf.userProfile
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-5">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<CreateIcon />} label="Post" />
          <Tab icon={<FavoriteIcon />} label="Good" />
          <Tab icon={<DownloadIcon />} label="Download" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        {myPosts &&
          myPosts.map((post) => (
            <MessageCard
              key={post.id}
              post={post}
              // comments={filteredComment.filter((comment) => {
              //   return post.id === comment.post;
              // })}
            />
          ))}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {goodPosts &&
          goodPosts.map((post) => (
            <MessageCard
              key={post.id}
              post={post}
              // comments={filteredComment.filter((comment) => {
              //   return post.id === comment.post;
              // })}
            />
          ))}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {myPosts &&
          downloadPosts.map((post) => (
            <MessageCard
              key={post.id}
              post={post}
              // comments={filteredComment.filter((comment) => {
              //   return post.id === comment.post;
              // })}
            />
          ))}
      </TabPanel>
    </div>
  );
}
