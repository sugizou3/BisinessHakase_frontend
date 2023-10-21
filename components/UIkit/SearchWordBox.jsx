import * as React from "react";
import { ProfileIcon, dateFunction } from ".";
import { selectProfile } from "../../src/reducks/auth/authSlice.js";
import { selectDictionary } from "../../src/reducks/dictionary/dictionarySlice.js";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChipTag } from ".";
import { Textsms } from "@mui/icons-material";
import {
  fetchAsyncPatchLiked,
  selectPostEditState,
  setPostEditState,
  resetPostEditState,
} from "src/reducks/post/postSlice";

export default function SearchWordBox({ postWords, deleteWord, addWord }) {
  const dictionary = useSelector(selectDictionary);
  const editState = useSelector(selectPostEditState);
  var texts = [];

  const [word, setWord] = useState("");
  const [displayWord, setDisplayWord] = useState([]);
  const handleChangeWord = (event) => {
    setWord(event.target.value);
  };

  const displayWordFunc = (word) => {
    if (displayWord.length != 0) {
      var lastId = displayWord[displayWord.length - 1].id;
    } else {
      var lastId = 0;
    }

    console.log(word);
    // console.log("click");
    setDisplayWord((preWord) => [...preWord, { id: lastId + 1, word: word }]);
  };
  const displayDelete = (id) => {
    console.log(displayWord);
    var result = displayWord.filter((item) => {
      return item.id != id;
    });
    setDisplayWord(result);
  };

  postWords.forEach((wordId) => {
    for (var i = 0; i < dictionary.length; i++) {
      if (wordId == dictionary[i].id) {
        texts.push([wordId, dictionary[i].text]);
      }
    }
  });

  return (
    <div>
      {editState ? (
        <div>
          <Box className="flex bg-gray-300 rounded-2xl h-30 mb-6 p-2 flex-wrap  overflow-y-hidden overflow-y-scroll break-normal hidden-scrollbar hidden-scrollbar::-webkit-scrollbar gap-y-2">
            {texts &&
              texts.map((text, index) => (
                <ChipTag
                  key={index}
                  label={text[1]}
                  id={[text[0]]}
                  deleteWord={deleteWord}
                />
              ))}
            {displayWord &&
              displayWord.map((text, index) => (
                <ChipTag
                  key={index}
                  label={text.word}
                  id={text.id}
                  deleteWord={displayDelete}
                />
              ))}
          </Box>
          <Box className=" flex bg-gray-300 rounded-3xl  px-4 py-1">
            <TextField
              id="standard-size-small"
              variant="standard"
              className="min-w-full w-full "
              onChange={handleChangeWord}
            />
            <Chip
              icon={<AddCircleOutlineIcon />}
              label="追加"
              onClick={() => {
                // addWord(word);
                displayWordFunc(word);
              }}
            />
          </Box>
        </div>
      ) : (
        <Box className="flex bg-gray-300 rounded-2xl h-30 mb-6 p-2 flex-wrap  overflow-y-hidden overflow-y-scroll break-normal hidden-scrollbar hidden-scrollbar::-webkit-scrollbar gap-y-2">
          {texts &&
            texts.map((text,index) => (
              <ChipTag key={index} label={text[1]} id={[text[0]]} deleteWord={deleteWord} />
            ))}
        </Box>
      )}
    </div>
  );
}
