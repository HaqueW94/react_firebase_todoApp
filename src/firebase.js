import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';


const app=firebase.initializeApp({
    apiKey: "AIzaSyAALQ5ezZMQjBpoHeS1ff6BDeuRrIEBdew",
    authDomain: "test-one-412cd.firebaseapp.com",
    projectId: "test-one-412cd",
    storageBucket: "test-one-412cd.appspot.com",
    messagingSenderId: "1026442527412",
    appId: "1:1026442527412:web:9c797a772e5e552ba10de1"
});

export const fireDB=app.database();
export const auth=app.auth();
export default app;