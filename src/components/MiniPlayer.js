import React from 'react';

import ReactPlayer from 'react-player';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { pause, played } from '../redux/actions/mediaPlayerActions.js';


export default function MiniPlayer() {
    const player = useSelector((reducer) => reducer.playerReducer)
    const playerSeekTo = useSelector((reducer) => reducer.playerReducer.seekTo)
    const dispatch = useDispatch();
    const ref = React.createRef();

    const handleEnded = () => {
        dispatch(pause());
    }
    const handleProgress = event => {
        if (player.seeking === false) {
            dispatch(played(event.played))
        }
    }
    React.useEffect(()=>{
        console.log(playerSeekTo)
        ref.current.seekTo(parseFloat(playerSeekTo));
    },[playerSeekTo])

    return (
        <ReactPlayer
            ref={ref}
            width="0"
            height="0"
            playing={player.playing}
            url={player.data}
            onEnded={() => handleEnded()}
            loop={player.loop}
            onProgress={handleProgress}
        />
    );
}