import React from "react";
import Navbar from "../components/Header/Navbar";
import ItemList from "../components/ItemList";
import {AddItemProvider} from '../contexts/AddItemContext';
import { useAuth } from '../contexts/AuthContext';
import {fireDB} from '../firebase';


function Dashboard(){
    const[list,setList]=React.useState();
    const{currentUser}=useAuth();
    React.useEffect(()=>{
      const todoRef=fireDB.ref('TODO');
      todoRef.on('value',(snapshot)=>{
        const data=snapshot.val();
        const lists=[];
        for(let id in data){
          if(data[id].email===currentUser.email){
            lists.push({id,...data[id]});
          }
        }
        setList(lists)
       
      })
    },[])
    console.log(list)
    return(
      <AddItemProvider>
       <Navbar userPhoto={currentUser.photoURL} email={currentUser.email}/>
       {list && list.map((arr)=>{return <ItemList key={arr.id} id={arr.id} item={arr.list_item}/>})}
      </AddItemProvider>

    )
}

export default Dashboard;