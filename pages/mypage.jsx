import "tailwindcss/tailwind.css";
import { useState } from "react";
import Layout from "../components/Layout";
import Avatar from "@mui/material/Avatar";
import {  ProfileIcon } from "../components/UIkit/index";
import { useSelector } from "react-redux";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import TabPanel from "@mui/material/TabPanel";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateIcon from "@mui/icons-material/Create";
import DownloadIcon from "@mui/icons-material/Download";
import { selectPosts } from "src/reducks/post/postSlice";
import { MessageCard } from "../components/UIkit";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  selectProfiles,
  selectProfile,
} from "../src/reducks/auth/authSlice.js";

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

export default function mypage() {
  const userProf = useSelector(selectProfiles);
  const myProf = useSelector(selectProfile);
  const posts = useSelector(selectPosts);

  const myPosts = posts.filter((post) => post.userPost == myProf.userProfile);
  const goodPosts = posts.filter((post) => post.good == myProf.userProfile);
  const downloadPosts = posts.filter(
    (post) => post.download == myProf.userProfile
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Search">
      <div className="flex flex-col items-center mt-5">
        <ProfileIcon scale={120} />
        <div className="m-3">{myProf.nickName}</div>

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
        {myPosts &&
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
    </Layout>
  );
}
