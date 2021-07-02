import React from 'react';
import { Button,Grid,Avatar,Typography,TextField,makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {FaGoogle,FaMailBulk} from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

 const useStyle=makeStyles((theme)=>({
     root:{
         minHeight:"100vh",
         padding:theme.spacing(0),
         margin:theme.spacing(0),
     },
     LoginBackground:{
        backgroundImage:"url(https://source.unsplash.com/random)",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"none",
        padding:theme.spacing(0),
        margin:theme.spacing(0),
     },
     formGrid:{
         display:"flex",
         width:"100%",
         padding:theme.spacing(5),
         flexDirection:"column",
         alignItems:"center",
         justifyContent:"center",
     },
     form:{
         width:"100%",
         marginBottom:theme.spacing(2)
     },
     alert:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
    }
 }))

function Login(){
    const {login,loginGoogle}=useAuth();
    const[Error,setError]=React.useState('');
    const emailRef=React.useRef();
    const passwordRef=React.useRef();
    const history=useHistory();
    const[loading,setLoading]=React.useState(false)
    async function handleLogin(e){
        e.preventDefault();
        setLoading(true)
        try{
            await login(emailRef.current.value,passwordRef.current.value);
            history.push('/')
        }catch(err){
            setLoading(false)
            setError(err.message);
        }
    }

    async function handleGoogleLogin(){
        setLoading(true)
        try{
            
            await loginGoogle();
            history.push('/')
        }catch(err){
            setLoading(false)
            setError(err.message);
        }
    }

    const classes=useStyle();
    return(
       <Grid container component="main" className={classes.root}>
          <Grid item sm={false} md={7} className={classes.LoginBackground}></Grid> 
          <Grid item xs={12} md={5} className={classes.formGrid}>
           <div className={classes.formGrid}>
           <Avatar><LockOutlinedIcon/></Avatar>
                   <h3>Log In</h3>
                   {Error &&  <Alert severity="error" className={classes.alert}>
                       <AlertTitle>Info</AlertTitle>
                       This is an info alert — <strong>{Error}</strong>
                   </Alert>}
                   <form className={classes.form}>
                         <TextField inputRef={emailRef} variant="outlined" type="email" fullWidth label="Email" required autoFocus margin="normal"/>
                         <TextField inputRef={passwordRef} variant="outlined" type="password" fullWidth label="Password" required margin="normal"/>
                        <Button disabled={loading} type="submit" style={{marginTop:"15px",padding:"10px"}} color="primary" fullWidth variant="contained" onClick={handleLogin}>Login with <FaMailBulk style={{marginLeft:"10px"}}/></Button>
                   </form>
                   <Typography variant="h6">-or-</Typography>
                   <Button disabled={loading} type="submit" style={{marginTop:"15px",padding:"10px"}} color="primary" fullWidth variant="contained" onClick={handleGoogleLogin}>Login with <FaGoogle style={{marginLeft:"10px"}}/></Button>
                   <div style={{marginTop:"16px"}}>Need an account? <Link to="/signup">SignUp</Link></div>
           </div>
          </Grid> 
       </Grid> 
    )
}

export default Login;