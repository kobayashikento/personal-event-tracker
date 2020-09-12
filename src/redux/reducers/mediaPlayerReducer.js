import {
    PLAY,
    PAUSE,
    PREV,
    NEXT,
    LOOP,
    PLAYED
} from '../actions/mediaPlayerActions.js';

export function playerReducer(state = { playing: false, played: 0, index: 0, data: undefined, loop: false }, action) {
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
                ...action.payload - 1
            }
        case NEXT: {
            return {
                ...state,
                ...action.payload + 1
            }
        }
        case LOOP: {
            return {
                ...state, 
                loop: true
            }
        }
        case PLAYED: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: 
        return state;
    }
}
