import YouTube  from "react-youtube";
import { SearchComponent } from "./index.jsx";
import { ProRegIcon } from ".";
import { useDispatch } from "react-redux";

export default function RightContent() {
    
    // var getYoutubeTitle = require('get-youtube-title')
    // getYoutubeTitle('XfqU_NhTmr8', function (err, title) {
    //     console.log(title) 
    //   })
    const opts = {
        height: '200px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // origin: 'http://localhost:3000',
            origin: 'https://www.youtube.com',
            host: 'http://localhost:3000',
            // host: 'https://www.youtube.com',
            rrr:"tete",
          },
      };


  return (
    <div>
        
        {/* <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} loading="lazy" className="pb-8" /> */}
        {/* <YouTube videoId="5fReO4IzjmY" opts={opts} className="pb-8" />
        <YouTube videoId="O0yXEfkFm3o" opts={opts} className="pb-8" />
        <YouTube videoId="dMYRs-2nQAI" opts={opts} className="pb-8" />
        <YouTube videoId="KSzpfL8AoDM" opts={opts} className="pb-8" />
        <YouTube videoId="U7LC-QKE5F4" opts={opts} className="pb-8" />
        <YouTube videoId="XfqU_NhTmr8" opts={opts} className="pb-8" /> */}
    </div>
  );
}
