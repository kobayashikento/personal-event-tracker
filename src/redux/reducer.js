import { combineReducers } from "redux";
import { playerReducer } from '../redux/reducers/mediaPlayerReducer.js';
import { dataReducer } from '../redux/reducers/dataReducer.js';

const reducer = combineReducers({
    playerReducer, dataReducer
});

export default reducer;