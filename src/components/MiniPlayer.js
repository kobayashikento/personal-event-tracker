import React from 'react';

import ReactPlayer from 'react-player';
import { useSelector } from "react-redux";
import RootState from '../redux/reducer.js';

const player = useSelector((state: RootState) => )

export default function MiniPlayer() {
    return (
        <ReactPlayer
            ref={ref}
            width="0"
            height="0"
            playing={state.playing}
            url={musicData[state.currMusicIndex].fullUrl}
            onEnded={() => handleEnded()}
            loop={state.loop}
            onProgress={handleProgress}
        />
    );
}