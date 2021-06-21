import React from 'react';
import { Button,Grid,Avatar,TextField,makeStyles} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAuth } from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom';

 const useStyle=makeStyles((theme)=>({
     root:{
         height:"100vh",
         padding:theme.spacing(0),
         margin:theme.spacing(0),
     },
     SigninBackground:{
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

function SignIn(){
    const {signup}=useAuth();
    const[Error,setError]=React.useState('');
    const[loading,setLoading]=React.useState(false);
    const emailRef=React.useRef();
    const passwordRef=React.useRef();
    const passwordConfirmationRef=React.useRef();
    const classes=useStyle();
    const history=useHistory();

    async function handleSignup(e){
        e.preventDefault();
        setLoading(true);
        if(passwordRef.current.value!==passwordConfirmationRef.current.value){
            setError("password do not match");
        }
        try{
            await signup(emailRef.current.value,passwordRef.current.value);
            history.push('/')
        }catch(err){
            setLoading(false)
            setError(err.message);
        }

    }
    return(
       <Grid container component="main" className={classes.root}>
          <Grid item sm={false} md={7} className={classes.SigninBackground}></Grid> 
          <Grid item xs={12} md={5} className={classes.formGrid}>
           <div className={classes.formGrid}>
           <Avatar><LockOutlinedIcon/></Avatar>
                   <h3>Sign Up</h3>
                  {Error &&  <Alert severity="error" className={classes.alert}>
                       <AlertTitle>Info</AlertTitle>
                       This is an info alert — <strong>check it out!</strong>
                   </Alert>}
                   <form className={classes.form}>
                         <TextField inputRef={emailRef}  variant="outlined" type="email" fullWidth label="Email" required autoFocus margin="normal"/>
                         <TextField inputRef={passwordRef} variant="outlined" type="password" fullWidth label="Password" required margin="normal"/>
                         <TextField inputRef={passwordConfirmationRef} variant="outlined" type="password" fullWidth label="Confirm Password" required margin="normal"/>
                        <Button disabled={loading} type="submit" style={{marginTop:"15px",padding:"10px"}} color="primary" fullWidth variant="contained" onClick={handleSignup}>Sign Up</Button>
                   </form>
                   <div>Already have an account?<Link to="/login">Login</Link></div>
           </div>
          </Grid> 
       </Grid> 
    )
}

export default SignIn;