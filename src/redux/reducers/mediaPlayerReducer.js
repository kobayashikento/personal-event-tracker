import {
    PLAY,
    PAUSE,
    PREV,
    NEXT,
    LOOP,
    PLAYED,
    SEEKING,
    SET_DATA,
    SEEK_TO,
    SET_IMAGE
} from '../actions/mediaPlayerActions.js';

export function playerReducer(state = { playing: false, played: 0, index: 0, data: undefined, loop: false, played: 0, seeking: false, seekTo: 0, image: undefined }, action) {
    switch (action.type) {
        case PLAY:
            return {
                ...state,
                playing: true
            }
        case PAUSE:
            return {
                ...state,
                playing: false
            }
        case PREV:
            return {
                ...state,
                index: state.index - 1
            }
        case NEXT: {
            return {
                ...state,
                index: state.index + 1
            }
        }
        case LOOP: {
            return {
                ...state, 
                loop: !state.loop
            }
        }
        case PLAYED: {
            return {
                ...state,
                played: action.payload
            }
        }
        case SEEKING: {
            return {
                ...state, 
                ...action.payload
            }
        }
        case SET_DATA: {
            return { 
                ...state, 
                data: action.payload
            }
        }
        case SEEK_TO: {
            return {
                ...state,
                seekTo: action.payload
            }
        }
        case SET_IMAGE: {
            return { 
                ...state, 
                image: action.payload
            }
        }
        default: return state;
    }
}
