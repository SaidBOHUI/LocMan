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
    Typography
} from '@mui/material';
import { useForm } from 'react-hook-form'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 

import { useState } from 'react';


const Register = () => {

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [pwd, setPwd] = useState('');
    // const [tel, setTel] = useState('');
    // const [adresse, setAdresse] = useState('');
    // const [cp, setCp] = useState('');
    // const [city, setCity] = useState('');
    // const [permis, setPermis] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm()



    const AuSubmit = async(data) => {
        try {
            let reponse = await fetch("http://localhost:8000/user/register",{
                method : "POST",
                crossDomain : true,
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body:JSON.stringify({
                    firstName : data.firstName,
                    lastName : data.lastName,
                    email : data.email,
                    password : data.password,
                    tel : data.tel,
                    adresse: data.adresse,
                    CP : data.cp, 
                    city: data.ville,
                    permisNum: data.permis
                })
            })
            // console.log(data, 'data');
            if (reponse.status === 200) {
                navigate('/')
                console.log('good');
            }
            console.log('good');
        } catch (error) {
            console.log(error);
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

    // const onPwdChange = (event) => {
    //     setPwd(event.target.value)
    // }

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     console.log(firstName, lastName, email, pwd, tel, adresse, cp, city, permis);
    //     // setEmail('');
    //     // setPwd('');
    //     // setSuccess(true);
    //     try {
    //         fetch("http://localhost:8000/user/register",{
    //             method : "POST",
    //             crossDomain : true,
    //             headers : {
    //                 "Content-Type" : "application/json",
    //                 Accept : "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //             body:JSON.stringify({
    //                 firstName : firstName,
    //                 lastName : lastName,
    //                 email : email,
    //                 password : pwd,
    //                 tel : tel,
    //                 adresse: adresse,
    //                 CP : cp, 
    //                 city: city,
    //                 permisNum: permis
    //             })
    //         })
    //         console.log('good');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
      
      return(
        <Container maxWidth="xs" sx={{border:'#285181 solid 2px', padding: '2rem', marginTop:'5rem'}}>
            <form onSubmit={handleSubmit(AuSubmit)}>
                <Typography variant='h5' sx={{textAlign:'center', color:'#285181'}}>Créer mon compte</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField {...register("lastName", {required : 'Ce champ est requis'})} id="Nom" label="Nom" variant="standard" required={true}/>                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("firstName", {required : 'Ce champ est requis'})} id="Prenom" label="Prenom" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("tel", {required : 'Ce champ est requis'})} id="tel" label="Numéro de tel" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  {...register("email", {required : 'Ce champ est requis'})} id="email" label="email" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("adresse", {required : 'Ce champ est requis'})} id="adresse" label="adresse" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("cp", {required : 'Ce champ est requis'})} id="postal code" label="code postal" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("ville", {required : 'Ce champ est requis'})} id="ville" label="ville" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("permis", {required : 'Ce champ est requis'})} id="Numero du permis" label="Numéro du permis" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField 
                            id="password" 
                            label="Mot de passe" 
                            variant="standard" 
                            required={true} 
                            onChange={(e) => {setPwd(e.target.value)}}/>                 */}
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            // value={pwd}
                            {...register("password", {required : 'Ce champ est requis', minLength : {value : 6, message: 'Votre mot de passe doit faire au moins 6 caractères'}})}
                            // onChange={onPwdChange}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                        </FormControl>
                    </Grid>
                </Grid>
                {/* <Button variant="outlined" startIcon={<PersonAddAltIcon />} sx={{marginTop: '2rem'}} onClick={() => handleSubmit}>
                    Créer
                </Button> */}
                <Button 
                    type="submit"
                    variant="contained" 
                    startIcon={<PersonAddAltIcon />} 
                    sx={{cursor : 'pointer', justifyContent: 'center', alignItems: 'center', m:'2rem auto 0'}} 
                    // onClick={handleSubmit}
                >
                    Créer
                    {/* <Button type="submit" color='secondary' sx={{cursor : 'pointer', justifyContent: 'center', alignItems: 'center', m:'2rem auto 0'}}> */}
                </Button>
            </form>
        </Container>    
    )
}

export default Register