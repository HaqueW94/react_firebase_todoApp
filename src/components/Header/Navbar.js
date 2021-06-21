import React from 'react';
import {AppBar,Toolbar,Typography,Avatar,makeStyles,IconButton,Tooltip,Fab} from '@material-ui/core';
import AddItem from './AddItem';
import {ExitToApp,Add} from '@material-ui/icons';
import { AddContext } from '../../contexts/AddItemContext';
import { useAuth } from '../../contexts/AuthContext';
import {useHistory} from 'react-router-dom';


const useStyle=makeStyles((theme)=>({
  
    root: {
        flexGrow: 1,
      },
    avtr:{
        width:theme.spacing(8),
        height:theme.spacing(8),
        position:"absolute",
        top:"25px",
        left:"105px"
    },
    fab:{
        width:theme.spacing(5),
        height:theme.spacing(5), 
        marginRight:theme.spacing(2) 
    },
        paper:{
            marginTop:theme.spacing(8),
            height:"70vh",
            borderRadius:"0",
            backgroundImage:"url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80)",
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
        }
}))
function Navbar(props){
    const{logout}=useAuth();
    const[loading,setLoading]=React.useState(false);
    const {setShow}=React.useContext(AddContext);
    const classes=useStyle();
    const history=useHistory();

    const handleOpen_addbox=()=>{
        setShow("block")
    }

    async function handleLogout(){
          setLoading(true);
          try{
             await logout();
             history.push('/login');

          }catch(err){setLoading(false); history.push('/')}
    }
    
    
    return(
          <div className={classes.root}>
          <AppBar>
           <AddItem userEmail={props.email}/>
            <Toolbar>
             <Typography variant="body1" style={{flexGrow:"1"}}>Todo</Typography>
             <Avatar src={props.userPhoto} className={classes.avtr} />
             <Tooltip title="Add item"><Fab color="primary" onClick={handleOpen_addbox} className={classes.fab}><Add/></Fab></Tooltip>
             <Tooltip title="Logout"><IconButton disabled={loading} onClick={handleLogout}><ExitToApp/></IconButton></Tooltip>
            </Toolbar>
        </AppBar>
        <div className={classes.paper}/>
      </div>
    )
}

export default Navbar;
