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
import axios from 'axios';


const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm()



    const AuSubmit = async(data) => {
        try {
            console.log(data, "data");
            let reponse = await axios.post("/user/register",{ firstName : data.firstName, lastName : data.lastName, email : data.email, password : data.password, tel : data.tel, adresse: data.adresse, CP : data.cp, city: data.ville, permisNum: data.permis})
            // console.log(data, 'data');
            if (reponse.status === 200) {
                navigate('/')
                console.log('good');
            }
        } catch (error) {
            console.log(error);
        }

    }


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
      
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
                        <TextField {...register("permis", {required : 'Ce champ est requis'})} id="permis" label="Numéro du permis" variant="standard" required={true} />                
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {required : 'Ce champ est requis', minLength : {value : 6, message: 'Votre mot de passe doit faire au moins 6 caractères'}})}
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
                <Button 
                    type="submit"
                    variant="contained" 
                    startIcon={<PersonAddAltIcon />} 
                    sx={{cursor : 'pointer', justifyContent: 'center', alignItems: 'center', m:'2rem auto 0'}} 
                >
                    Créer
                </Button>
            </form>
        </Container>    
    )
}

export default Register