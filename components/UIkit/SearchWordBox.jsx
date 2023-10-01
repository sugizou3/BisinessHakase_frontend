import * as React from "react";
import { ProfileIcon,dateFunction } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { selectDictionary } from "../../src/reducks/dictionary/dictionarySlice.js";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { ChipTag } from ".";
import { Textsms } from "@mui/icons-material";


export default function SearchWordBox({postWords}) {
  const dictionary = useSelector(selectDictionary);
  var texts = []
 
  postWords.forEach((wordId) =>{
    for(var i=0;i < dictionary.length;i++){
      if (wordId==dictionary[i].id) {
        texts.push(dictionary[i].text) 
      }
    }
  })


  return (
    <Box className="flex bg-gray-300 rounded-2xl h-30 mb-6 p-2 flex-wrap  overflow-y-hidden overflow-y-scroll break-normal hidden-scrollbar hidden-scrollbar::-webkit-scrollbar gap-y-2">
      {texts &&
        texts.map((text) => (
          <ChipTag label={text} />
        ))}
    </Box>
  );
}
