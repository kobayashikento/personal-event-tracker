import { combineReducers } from "redux";
import { playerReducer } from '../redux/reducers/mediaPlayerReducer.js';
import { dataReducer } from '../redux/reducers/dataReducer.js';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const reducer = combineReducers({
    playerReducer, 
    dataReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default reducer;