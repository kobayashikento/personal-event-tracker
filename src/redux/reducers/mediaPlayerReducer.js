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
} from '../actions/mediaPlayerActions.js';

export function playerReducer(state = { playing: false, played: 0, index: 0, data: [{
    "fullUrl" : "https://www.youtube.com/watch?v=fmU9MXi9Uz0",
    "group" : "Youtube",
    "name" : "Gathers Under Night",
    "src" : "fmU9MXi9Uz0",
    "subtitle" : "Under Night In-Birth OST"
  }]
  , loop: false, played: 0, seeking: false, seekTo: 0 }, action) {
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
        default: return state;
    }
}
