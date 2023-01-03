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
    Box,
    Link,
} from '@mui/material';
// const axios = require('axios');
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GlobalState } from '../Components/GlobalState';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    // const [user, setUser] = useState({email:'', password:''})
    const state = useContext(GlobalState)
	const [isLogged, setIsLogged] = state.userApi.isLogged
	const [isAdmin, setIsAdmin] = state.userApi.isLogged
	// const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isLogged
    const [erreur, setErreur] = useState({})
    const [pwd, setPwd] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()    


    const connexion = async(data, event) => {
        // event.preventDefault()
        // console.log(data, 'data');
        let {email, password} = data
        try {
            await axios.post("/user/login", { email, password });            
            localStorage.setItem("firstLogin", true)
            setIsLogged(true);
            // navigate('/')
            console.log(isAdmin, 'isAdmin');
            isAdmin ? window.location.href = '/admin/vehicules' : window.location.href = '/'
            // isAdmin || isSuperAdmin ? window.location.href = '/admin/vehicules' : window.location.href = '/'
        } catch (error) {
                console.log("erreur status 400");
                setErreur({msg: 'Au moins un de vos identifiants est incorrect'})
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onPwdChange = (event) => {
        setPwd(event.target.value)
    }

    // console.log(erreur, "ERREEUR");

      return(
        <Container maxWidth="xs" sx={{border:'#285181 solid 2px', padding: '3rem', marginTop:'5rem'}}>
            <form onSubmit={handleSubmit(connexion)}>
                <Typography variant='h5' sx={{textAlign:'center', color:'#285181'}}>Connexion</Typography>
                <p style={{textAlign: 'center', margin: '1rem 0', color: '#CC0001'}}>{erreur?.msg}</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField {...register("email", {required : 'Ce champ est requis'})} id="email" label="email" variant="standard" inputProps={{autoComplete: 'username'}} fullWidth sm={{ m: 1 }}/>  
                        <FormHelperText id="component-error-text" error={true}>{(errors.email && errors.email.message) || (erreur?.erreur ?? '')}</FormHelperText>                        
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
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
                            <FormHelperText id="component-error-text" error={true}>{(errors.password && errors.password.message) || (erreur?.erreur ?? '')}</FormHelperText>
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
                    <Box sx={{width:"100%", display:"flex", justifyContent: "space-between", m:3, mb:0, mt:5}}>
                        <Link to="/register" sx={{cursor: "pointer"}}>
                            <Typography variant="caption">Créer un compte</Typography>
                        </Link>
                        <Link to="/pwdForgotten" sx={{cursor: "pointer"}}>
                            <Typography variant="caption">Mot de passe oublié</Typography>
                        </Link>
                    </Box>
                    {/* </Grid> */}
                </Grid>
            </form>
        </Container>    
    )
}

export default Login