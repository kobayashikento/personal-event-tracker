import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBnytW52-pJjw0dl30OCw48vpa2OvV7S00",
    authDomain: "life-tracker-7fb87.firebaseapp.com",
    databaseURL: "https://life-tracker-7fb87.firebaseio.com",
    projectId: "life-tracker-7fb87",
    storageBucket: "life-tracker-7fb87.appspot.com",
    messagingSenderId: "329127552217",
    appId: "1:329127552217:web:bf3b5d72097e98d7be0ac8",
    measurementId: "G-BQN7TSV44R"
};

firebase.initializeApp(firebaseConfig);

export default firebase; 