import React from 'react';

import ReactPlayer from 'react-player';
import { pause, played, seekTo } from '../redux/actions/mediaPlayerActions.js';

import { connect } from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const MiniPlayer = (props) => {
    const player = React.createRef();
    const isFirstRun = React.useRef(true);

    React.useLayoutEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        player.current.seekTo(parseFloat(props.playerSeekTo));
    }, [props.playerSeekTo])

    const handleEnded = () => {
        props.played(0);
        props.pause();
    }
    const handleProgress = event => {
        if (!props.playerSeeking) {
            props.played(event.played)
        }
    }

    if (Object.keys(props.playerData).length === 0 && props.playerData.constructor === Object) {
        return (null);
    } else {
        return (
            <ReactPlayer
                ref={player}
                width="0"
                height="0"
                playing={props.playerPlaying}
                url={props.playerData[props.playerIndex].url}
                onEnded={() => handleEnded()}
                loop={props.playerLoop}
                onProgress={handleProgress}
            />
        )
    }
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
        pause: () => dispatch(pause()),
        seekTo: (value) => dispatch(seekTo(value)),
        played: (value) => dispatch(played(value)),
    }
}

export default 
    connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)