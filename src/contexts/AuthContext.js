import React from 'react';
import firebase from 'firebase';
import {auth} from '../firebase';

const AuthContext=React.createContext();

export function useAuth(){
    return React.useContext(AuthContext);
}

export function AuthProvider({children}){
    const[currentUser,setCurrentUser]=React.useState();
    const[loading,setLoading]=React.useState(true)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut();
    }

    function loginGoogle(){
        return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

   

   

    /*function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function passwordUpdate(password){
        return auth.currentUser.updatePassword();
    }

    function emailUpdate(email){
        return auth.currentUser.updateEmail();
    }*/
    let Value={
        signup,
        login,
        logout,
        loginGoogle,
        currentUser
    }

    React.useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    },[])

      return(
        <AuthContext.Provider value={Value}>
            {!loading && children}
        </AuthContext.Provider>
      )
}

