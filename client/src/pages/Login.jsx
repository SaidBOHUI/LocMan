import {
    Container, 
    Grid, 
    Stack, 
    TextField, 
    FormControl, 
    InputLabel, 
    Input, 
    InputAdornment, 
    IconButton,
    Button,
    Typography,
    FormHelperText,
} from '@mui/material';
// const axios = require('axios');
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [erreur, setErreur] = useState({})
    // const [errEmail, setErrEmail] = useState('')
    // const [errPwd, setErrPwd] = useState('')
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    console.log(errors, 'errors')

    // if (errors.email) {
    //     setErrEmail(errors.email.message)
    // }
    // if (errors.password) {
    //     setErrPwd(errors.password.message)
    // }
    // console.log(watch());

    const AuSubmit = async(data) => {
        console.log(data, 'data');
        try {
            let reponse = await fetch("http://localhost:8000/user/login",{
                method : "POST",
                crossDomain : true,
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body:JSON.stringify({
                    email : data.email,
                    password : data.password,
                })
            })
            console.log(reponse, 'msg');
            // if (reponse.msg === "Aucun utilisateur n'est connu à cet email"){
            //     setErrEmail("Aucun utilisateur n'est connu à cet email")
            //     return("mauvais email")
            // }
            // if (reponse.msg === "Mot de passe incorrect") {
            //     setErrPwd("Mot de passe incorrect")
            //     return("mauvais mot de passe")
            // }else{
                if (reponse.status === 200) {
                    navigate('/')
                    console.log('good');
                }
                else if (reponse.status === 400) {
                    setErreur({msg: 'Au moins un de vos identifiants est incorrect'})
                }
            // }
        } catch (error) {
            console.log(error, "Error dans l'API");
        }
    }



    // const handleChange = (event) => {
    //     setValues( event.target.value });
    //   };    

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onPwdChange = (event) => {
        setPwd(event.target.value)
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     console.log(email, pwd, 'email, pwd');
    //     // setEmail('');
    //     // setPwd('');
    //     // setSuccess(true);
    //     try {
    //         fetch("http://localhost:8000/user/login",{
    //             method : "POST",
    //             crossDomain : true,
    //             headers : {
    //                 "Content-Type" : "application/json",
    //                 Accept : "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //             body:JSON.stringify({
    //                 email : email,
    //                 password : pwd,
    //             })
    //         })

    //         console.log('good');
    //         navigate('/')
    //     } catch (error) {
    //         console.log(error, "Error dans l'API");
    //     }
    // }
      console.log(erreur, 'erreur');
      return(
        <Container maxWidth="xs" sx={{border:'#285181 solid 2px', padding: '3rem', marginTop:'5rem'}}>

            <form onSubmit={handleSubmit(AuSubmit)}>
                <Typography variant='h5' sx={{textAlign:'center', color:'#285181'}}>Connexion</Typography>
                <p style={{textAlign: 'center', margin: '1rem 0', color: '#CC0001'}}>{erreur?.msg}</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField {...register("email", {required : 'Ce champ est requis'})} id="email" label="email" variant="standard" fullWidth sm={{ m: 1 }}/>  
                        <FormHelperText id="component-error-text" error={true}>{errors.email?.message || erreur !== ''?.erreur}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={pwd}
                                {...register("password", {required : 'Ce champ est requis', minLength : {value : 6, message: 'Votre mot de passe doit faire au moins 6 caractères'}})}
                                onChange={onPwdChange}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="component-error-text" error={true}>{errors.password?.message || erreur !== ''?.erreur}</FormHelperText>
                        </FormControl>
                        {/* <span>{errors.password?.message}</span> */}
                    </Grid>
                    {/* <Grid item xs={12}> */}
                        <Button 
                            type="submit"
                            variant="contained" 
                            startIcon={<LoginIcon />} 
                            sx={{cursor : 'pointer', justifyContent: 'center', alignItems: 'center', m:'2rem auto 0'}} 
                            // onClick={handleSubmit}
                        >
                            Connexion
                            {/* <Button type="submit" color='secondary' sx={{cursor : 'pointer', justifyContent: 'center', alignItems: 'center', m:'2rem auto 0'}}> */}
                        </Button>
                    {/* </Grid> */}
                </Grid>
            </form>
        </Container>    
    )
}

export default Login