import React, { useState, useEffect, useContext } from 'react'
import { useForm, Controller} from "react-hook-form"
import { GlobalState } from '../../Components/GlobalState';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Box, 
    Typography,
    FormControl,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Alert,
    Snackbar,
    MenuItem
} from '@mui/material'



const EditVehicule = () => {
    const id = useParams().id
    const state = useContext(GlobalState)
    const [token, setToken] = state.token
    const [car, setCar] = useState([])
    const [fileName, setFileName] = useState(null)
    const label = { inputProps: { 'aria-label': 'Disponibilité' } };
    const [fichier, setFichier] = useState({})
    const {control, handleSubmit, register, watch, name, reset,setValue, rules, formState: {errors}} = useForm(
        {
            defaultValues: async() => {
                let res = await axios.get(`/api/vehicule/${id}`).data.vehicule
                setCar(res)
                return(res)
            }
        }
    )
    // const {control, register, name, rules, handleSubmit, formState: {errors}} = useForm()


    useEffect(() => {
        async function dataVehicule(){
            try {
                let res = await axios.get(`/api/vehicule/${id}`)
                // console.log(await (await axios.get(`/api/vehicule/${id}`)).data.vehicule, 'tt ça');
                let dataVehicule = res.data.vehicule
                // console.log(dataVehicule, 'vehicule');
                setCar(dataVehicule)
                reset(dataVehicule);
            } catch (error) {
                console.log(error);
            }
        }    
        dataVehicule();
    }, [id, reset])
    useEffect(() => {
        
    }, [])
    

    const onSubmit = async(data) => {
        try {
            console.log(errors);
            let {marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, description, disponibilite} = data
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
            let modif = await axios.put(`/api/vehicule/${id}`,{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite}, {headers: {Authorization : token}})
            console.log(modif , 'modif');
            let destroy = await axios.post('/api/destroy', data.photo, {headers: {Authorization : token}})
            console.log(destroy, 'destroy');
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

    // let emb = car.embrayage
    return (
        <>
            <Snackbar autoHideDuration={5000}>
                <Alert variant='filled' severity="error">Le véhicule n'a pas pu être modifié</Alert>
            </Snackbar>
            <Box sx={{ m: 5, p: 3 }}>
                {/* <Box sx={{m:5, border:'black solid 2px', p:3}}> */}
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Edit vehicules
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
                            required={"required"}
                        />
                        )}
                        name={"marque"}
                        control={control}
                        helperText={"marque"}
                        fullWidth
                        required={"required"}
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
                        required={"required"}
                        defaultValue= {car.modele}
                    />
                    <Controller
                        render={({type}) => (
                            <TextField
                            {...register("type")}
                            id="type"
                            helperText="type"
                            variant="outlined"
                            autoFocus={true}
                            required={"required"}
                            />
                        )}
                        name={"type"}
                        control={control}
                        helperText={"type"}
                        fullWidth
                        required={"required"}
                    />

                    <Controller
                        render={({couleur}) => (
                            <TextField
                            {...register("couleur")}
                            id="couleur"
                            helperText="couleur"
                            variant="outlined"
                            required={"required"}
                            />
                        )}
                        name={"couleur"}
                        control={control}
                        helperText={"couleur"}
                        fullWidth
                        required={"required"}
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
                            required={"required"}
                            />
                        )}
                        name={"nbPlaces"}
                        control={control}
                        helperText={"nbPlaces"}
                        fullWidth
                        required={"required"}
                    />
                    <Controller
                        render={({kilometrage}) => (
                            <TextField
                            {...register("kilometrage")}
                            id="kilometrage"
                            helperText="kilometrage"
                            variant="outlined"
                            required={"required"}
                            />
                        )}
                        name={"kilometrage"}
                        control={control}
                        helperText={"kilometrage"}
                        fullWidth
                        required={"required"}
                    />
                    <Controller
                        render={({moteur}) => (
                            <TextField
                            {...register("moteur")}
                            id="moteur"
                            helperText="moteur"
                            variant="outlined"
                            required={"required"}
                            />
                        )}
                        name={"moteur"}
                        control={control}
                        helperText={"moteur"}
                        fullWidth
                        required={"required"}
                    />
                    <Controller
                        render={({embrayage}) => (
                            <TextField
                            {...register("embrayage")}
                            id="embrayage"
                            helperText="embrayage"
                            variant="outlined"
                            required={"required"}
                            select
                            // defaultValue={emb}
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
                        required={"required"}
                        defaultValue={car.embrayage}
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
                                required={"required"}
                                />
                            )}
                            name={"plaque"}
                            control={control}
                            helperText={"plaque"}
                            fullWidth
                            required={"required"}
                        />
                        <Controller
                            render={({prixLoc}) => (
                                <TextField
                                {...register("prixLoc")}
                                id="prixLoc"
                                helperText="prixLoc(€)"
                                variant="outlined"
                                required={"required"}
                                />
                            )}
                            name={"prixLoc"}
                            control={control}
                            helperText={"prixLoc(€)"}
                            fullWidth
                            required={"required"}
                        />
                        <Controller
                            render={({prixKm}) => (
                                <TextField
                                {...register("prixKm")}
                                id="prixKm"
                                helperText="prixKm(€)"
                                variant="outlined"
                                required={"required"}
                                />
                            )}
                            name={"prixKm"}
                            control={control}
                            helperText={"prixKm(€)"}
                            fullWidth
                            required={"required"}
                        />
                        <Controller
                            render={({prixCaution}) => (
                                <TextField
                                {...register("prixCaution")}
                                id="prixCaution"
                                helperText="prixCaution(€)"
                                variant="outlined"
                                required={"required"}
                                />
                            )}
                            name={"prixCaution"}
                            control={control}
                            helperText={"prixCaution(€)"}
                            fullWidth
                            required={"required"}
                        />
                    </Box>
                    <Box sx={{ display: "flex", mt: 5, flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Box></Box>
                        <Controller
                            render={({disponibilite}) => (
                            <FormControlLabel
                            {...register("disponibilite")}
                            control={<Checkbox {...label} />}
                            label={"Disponible"}
                            /> 
                            )}
                            name={"Disponible"}
                            control={control}
                            fullWidth
                            required={"required"}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {!watch('files') || watch('files').length === 0 ? (
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
                                        required={"required"}
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
                            // type="file"
                            fullWidth
                        />) : (<span>{fileName}</span>)}
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
                                //   defaultValue={!car.type || car.type === undefined ? '' : car.type}
                            />
                        )}
                        name={"description"}
                        control={control}
                        fullWidth
                        required={"required"}
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

export default EditVehicule