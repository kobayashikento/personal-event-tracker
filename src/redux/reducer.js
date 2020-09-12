import { combineReducers } from "redux";
import { playerReducer } from '../redux/reducers/mediaPlayerReducer.js';

const reducer = combineReducers({
    playerReducer,
});

export default reducer;