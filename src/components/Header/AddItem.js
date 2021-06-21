import React from 'react';
import {makeStyles,Tooltip,Fab,Paper} from '@material-ui/core';
import {Box,Container,TextField} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { AddContext } from '../../contexts/AddItemContext';
import { fireDB } from '../../firebase';


const useStyle=makeStyles((theme)=>({
    container:{
        backgrounColor:"white",
        display:"flex",
        justifyContent: 'center',
        alignItems:'center',
        position:"absolute",
        top:"10px",
        zIndex:"50"
    },
    fab:{
        width:theme.spacing(5),
        height:theme.spacing(5), 
        marginRight:theme.spacing(2) 
    },
    paper2:{
        padding:theme.spacing(4),   
       width:"40%",
     },
     formBody:{
         display:"flex"
     },
     closeIcon:{
         width:theme.spacing(2)
     }

}))

function AddItem(props){
    const {show,setShow}=React.useContext(AddContext);
    const classes=useStyle();
    const addListRef=React.useRef();
    const handleAddItem=()=>{
        setShow('none');
        const todoRef=fireDB.ref('TODO');
        const item={
            email:props.userEmail,
            list_item: addListRef.current.value}
        todoRef.push(item);
        addListRef.current.value=""
    }
    
    return(
        <Box display={show}>
        <Container className={classes.container}>
        <Paper elevation={2} className={classes.paper2}>
         <form>
             <div style={{textAlign:"right",marginBottom:"15px"}}>
                 <CloseIcon  className={classes.closeIcon} onClick={()=>{
                     setShow('none')
                 }}/>
             </div>
              <div className={classes.formBody} >
                <TextField inputRef={addListRef} style={{flexGrow:"1"}} label="Add item" autoFocus={true} margin="normal" required fullWidth variant="standard" />
                 <Tooltip title="Add item">
                <Fab  onClick={handleAddItem} color="primary" className={classes.fab}><Add/></Fab>
                </Tooltip>
                </div>
         </form>
        </Paper>
        </Container>
       </Box>
    )
}

export default AddItem;