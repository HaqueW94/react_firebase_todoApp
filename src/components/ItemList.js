import React from 'react';
import {Paper,Container,Grid,makeStyles} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import { fireDB } from '../firebase';

const useStyle=makeStyles((theme)=>({
    Conatiner:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    paper:{
        marginTop:theme.spacing(5),
        padding:theme.spacing(3),
        width:"60%"
    }
}))



function ItemList(props){
    const classes=useStyle();
    const removeItem=(id)=>{
      const todoRef=fireDB.ref('TODO').child(id);
      todoRef.remove();
    }
   
    return(
         <Container className={classes.Conatiner}>
             <Paper elevation={4} className={classes.paper}>
                 <Grid container>
                     <Grid item xs={10}>{props.item}</Grid>
                     <Grid item xs={2} style={{textAlign:"center"}} >
                        <Delete onClick={()=>removeItem(props.id)}/>
                     </Grid>
                 </Grid>
             </Paper>
         </Container>
    )
}


export default ItemList;
