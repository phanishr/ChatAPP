import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBwmA9mfIARfQE5ny90zyP8QAihNvOW05w",
    authDomain: "task-d1451.firebaseapp.com",
    databaseURL: "https://task-d1451-default-rtdb.firebaseio.com",
    projectId: "task-d1451",
    storageBucket: "task-d1451.appspot.com",
    messagingSenderId: "489745668464",
    appId: "1:489745668464:web:7f9d2c4ee40abb99e157b5",
    measurementId: "G-ELWDW1TBR9"
};
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
export default db;