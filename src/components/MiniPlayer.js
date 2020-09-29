import React from 'react';

import ReactPlayer from 'react-player';
import { pause, played, seekTo } from '../redux/actions/mediaPlayerActions.js';

import { connect } from 'react-redux';

const MiniPlayer = ({ playerSeeking, playerSeekTo, playerPlaying, playerIndex, playerData, playerLoop, played, pause, seekTo }) => {
    const player = React.useRef(null);

    const handleEnded = () => {
        pause();
        played(0);
    }
    const handleProgress = event => {
        if (playerSeeking === false) {
            played(event.played)
        }
    }

    React.useEffect(() => {
        if (player.current !== null) {
            console.log(player)
            player.current.seekTo(parseFloat(playerSeekTo));
            seekTo(0);
        }
    }, [playerSeekTo])

    return (
        <ReactPlayer
            ref={player}
            width="0"
            height="0"
            playing={playerPlaying}
            url={playerData[playerIndex]}
            onEnded={() => handleEnded()}
            loop={playerLoop}
            onProgress={handleProgress}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        playerSeeking: state.playerReducer.seeking,
        playerSeekTo: state.playerReducer.seekTo,
        playerPlaying: state.playerReducer.playing,
        playerIndex: state.playerReducer.index,
        playerData: state.playerReducer.data,
        playerLoop: state.playerReducer.loop
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pause: dispatch(pause()),
        seekTo: (value) => dispatch(seekTo(value)),
        played: (value) => dispatch(played(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)