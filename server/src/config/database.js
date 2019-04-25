import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB5RhAwCZo4j4gD9-z0WWpv4vaJdX51vuY",
    authDomain: "simple-react-crud-7b37d.firebaseapp.com",
    databaseURL: "https://simple-react-crud-7b37d.firebaseio.com",
    projectId: "simple-react-crud-7b37d",
    storageBucket: "simple-react-crud-7b37d.appspot.com",
    messagingSenderId: "170590000278"
  };

firebase.initializeApp(config);
export const ref = firebase.database().ref();
