import React from 'react';
import { fireDB } from "./firebase";


function Reed(){
    const [x,setX]=React.useState();
    React.useEffect(()=>{
        const todoRef = fireDB.ref('/Todo').child('-MceCDElKVfDsoJ_lK3z')
        todoRef.remove();
    
    })
   return "JIO";
}

export default Reed;