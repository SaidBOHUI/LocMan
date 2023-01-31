import React, { useState, useEffect, useContext } from 'react'
import { useForm, Controller} from "react-hook-form"
import { GlobalState } from '../../Components/GlobalState';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Box, 
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Alert,
    Snackbar,
    MenuItem
} from '@mui/material'



const CreateVehicule = () => {
    const [box, setBox] = useState(false)
    const state = useContext(GlobalState)
    const [token, setToken] = state.token
    const [fileName, setFileName] = useState(null)
    const label = { inputProps: { 'aria-label': 'Disponibilité' } };
    const [fichier, setFichier] = useState({})
    const {control, handleSubmit, register, watch, name, reset,setValue, rules, formState: {errors}} = useForm( )


    useEffect(() => {
    }, [])

    const handleCheck = (event) => {
            setBox(!box);
            console.log(box, 'box');
    }
    

    const onSubmit = async(data) => {
        try {
            console.log(errors);
            let {marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, baseFixe, prixKm, prixJour, prixCaution, description, disponibilite} = data
            let dataPhoto = fichier
            let photo;
            if (!(dataPhoto instanceof File) || dataPhoto === "" ){
                photo = data.photo
                // console.log(token, 'TOKEN IN IF');
            }
            else{
                const formData = new FormData();
                // console.log(dataPhoto, 'dataPhoto');
                formData.append("photo", dataPhoto);
                console.log('IN ELSE');
                // console.log(formData, 'formData');
                
                // console.log(formData, 'formData');
                let res = await axios.post('/api/upload', formData, {headers: {Authorization : token}});
                photo = res.data
                // console.log(photo, 'photo');
            }
            let create = await axios.post('/api/vehicules',{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, baseFixe:baseFixe, prixKm:prixKm, prixJour:prixJour, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite}, {headers: {Authorization : token}})
            console.log(create , 'create');
            return(window.location.href = '/admin/vehicules')     
        } catch (error) {
            console.log(error);
            return error
        }
    }

    let typeEmbrayages = [
        { 
            value: 'auto',
            label: 'auto'
        },
        { 
            value: 'manuel',
            label: 'manuel'
        }
    ]

    return (
        <>
            <Snackbar autoHideDuration={5000}>
            <Alert variant='filled' severity="error">Le véhicule n'a pas pu être modifié</Alert>
            </Snackbar>
            <Box sx={{ m: 5, p: 3 }}>
                <Typography variant="h3" sx={{ mb: 2, textAlign:'center' }}>
                    Ajouter un vehicule
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItem: "center",
                    margin: "auto",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
                    <Controller
                        render={({ marque }) => (
                        <TextField
                        {...register("marque")}
                            id="marque"
                            helperText="marque"
                            // label="marque"
                            variant="outlined"
                            autoFocus={true}
                            required
                        />
                        )}
                        name={"marque"}
                        control={control}
                        helperText={"marque"}
                        fullWidth
                    />
                    <Controller
                        render={({modele}) => (
                            <TextField
                            {...register("modele")}
                            id="modele"
                            helperText="modele"
                            variant="outlined"
                            />
                        )}
                        name={"modele"}
                        control={control}
                        helperText={"modele"}
                        fullWidth
                    />
                    <Controller
                        render={({type}) => (
                            <TextField
                            {...register("type")}
                            id="type"
                            helperText="type"
                            variant="outlined"
                            autoFocus={true}
                            required
                            />
                        )}
                        name={"type"}
                        control={control}
                        helperText={"type"}
                        fullWidth
                    />

                    <Controller
                        render={({couleur}) => (
                            <TextField
                            {...register("couleur")}
                            id="couleur"
                            helperText="couleur"
                            variant="outlined"
                            required
                            />
                        )}
                        name={"couleur"}
                        control={control}
                        helperText={"couleur"}
                        fullWidth
                    />
                    </Box>
                    <Box
                    sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}
                    >
                    <Controller
                        render={({nbPlaces}) => (
                            <TextField
                            {...register("nbPlaces")}
                            id="nbPlaces"
                            helperText="nbPlaces"
                            variant="outlined"
                            required
                            />
                        )}
                        name={"nbPlaces"}
                        control={control}
                        helperText={"nbPlaces"}
                        fullWidth
                    />
                    <Controller
                        render={({kilometrage}) => (
                            <TextField
                            {...register("kilometrage")}
                            id="kilometrage"
                            helperText="kilometrage"
                            variant="outlined"
                            required
                            />
                        )}
                        name={"kilometrage"}
                        control={control}
                        helperText={"kilometrage"}
                        fullWidth
                    />
                    <Controller
                        render={({moteur}) => (
                            <TextField
                            {...register("moteur")}
                            id="moteur"
                            helperText="moteur"
                            variant="outlined"
                            required
                            />
                        )}
                        name={"moteur"}
                        control={control}
                        helperText={"moteur"}
                        fullWidth
                    />
                    <Controller
                        render={({embrayage}) => (
                            <TextField
                            {...register("embrayage")}
                            id="embrayage"
                            helperText="embrayage"
                            variant="outlined"
                            required
                            select
                            // size={"large"}
                            sx={{width:"18%"}}
                            >
                                {typeEmbrayages.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                        name={"embrayage"}
                        control={control}
                        helperText={"embrayage"}
                        fullWidth
                        defaultValue={''}
                    />
                    </Box>
                    <Box
                    sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}
                    >
                        <Controller
                            render={({plaque}) => (
                                <TextField
                                {...register("plaque")}
                                id="plaque"
                                helperText="plaque"
                                variant="outlined"
                                pattern = '^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$'
                                required
                                />
                            )}
                            name={"plaque"}
                            control={control}
                            helperText={"plaque"}
                            pattern = '^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$'
                            fullWidth
                        />
                        <Controller
                            render={({baseFixe}) => (
                                <TextField
                                {...register("baseFixe")}
                                id="baseFixe"
                                helperText="baseFixe(€)"
                                variant="outlined"
                                required
                                />
                            )}
                            name={"baseFixe"}
                            control={control}
                            helperText={"baseFixe(€)"}
                            fullWidth
                        />
                        <Controller
                            render={({prixKm}) => (
                                <TextField
                                {...register("prixKm")}
                                id="prixKm"
                                helperText="prixKm(€)"
                                variant="outlined"
                                required
                                />
                            )}
                            name={"prixKm"}
                            control={control}
                            helperText={"prixKm(€)"}
                            fullWidth
                        />
                        <Controller
                            render={({prixCaution}) => (
                                <TextField
                                {...register("prixCaution")}
                                id="prixCaution"
                                helperText="prixCaution(€)"
                                variant="outlined"
                                required
                                />
                            )}
                            name={"prixCaution"}
                            control={control}
                            // helperText={"prixCaution(€)"}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: "flex", mt: 5, flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Controller
                            render={({prixJour}) => (
                                <TextField
                                {...register("prixJour")}
                                id="prixJour"
                                helperText="prixJour(€)"
                                variant="outlined"
                                required
                                />
                            )}
                            name={"prixJour"}
                            control={control}
                            // helperText={"prixJour(€)"}
                            fullWidth
                        />

                        <Controller
                            render={({disponibilite}) => (
                            <FormControlLabel
                            {...register("disponibilite")}
                            control={<Checkbox {...label} />}
                            label={"Disponible"}
                            checked={box}
                            onChange={handleCheck}
                            /> 
                            )}
                            name={"Disponible"}
                            control={control}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Controller
                            render={({files}) => (
                                    <Button
                                        {...register("files")}
                                        variant="contained"
                                        component="label"
                                        sx={{ mb: 1 }}
                                    >
                                        Upload photo
                                        <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            setFileName(e.target.files[0].name);
                                            setFichier(e.target.files[0]);
                                            // console.log(e.target.files[0], 'fichier');                                        
                                        }}
                                        // onChange={(e)=>{e.preventDefault(); setFileName(e.target.files[0].name)}}
                                        />
                                    </Button>
                            )}
                            name={"files"}
                            control={control}
                            label={"photo"}
                            type="file"
                            fullWidth
                            />
                            <span>{fileName}</span>
                        </Box>
                        <Box></Box>
                    </Box>
                    <Box
                        sx={{
                        width: "40%",
                        m: "auto",
                        mtop: 4,
                        alignItem: "center",
                        mt: 5,
                        }}
                    >
                        
                        <Controller
                        render={({description}) => (
                            <TextField
                            {...register("description")}
                            id="description"
                            helperText="description"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            multiline
                            required
                            />
                        )}
                        name={"description"}
                        control={control}
                        fullWidth
                        helperText="description"
                    />
                    </Box>
                    </Box>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    // startIcon={<PersonAddAltIcon />}
                    sx={{
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    m: "2rem auto 0",
                    display: "flex",
                    }}
                >
                    Modifier
                </Button>
                </form>
            </Box>
        </>
    );
}

export default CreateVehicule