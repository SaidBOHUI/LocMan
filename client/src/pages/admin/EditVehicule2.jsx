import React, { useContext, useEffect, useState } from 'react'
import { 
    Box, 
    Typography,
    FormControl,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
} from '@mui/material'
import { GlobalState } from '../../Components/GlobalState';
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const EditVehicule = (props) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const params = useParams()
    let id = params.id
    // console.log(id);
    const state = useContext(GlobalState)
	const [isLogged, setIsLogged] = state.userApi.isLogged
	const [isAdmin, setIsAdmin] = state.userApi.isAdmin
	// const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isAdmin
    const [car, setCar] = useState([])
    const [marque, setMarque] = useState('')
    const [fileName, setFileName] = useState('')
    const [token, setToken] = state.token
    
    useEffect(() => {
        async function dataVehicule(){
            try {
                let res = await axios.get(`/api/vehicule/${id}`)
                // console.log(res, 'res');
                let dataVehicule = res.data.vehicule
                // console.log(dataVehicule, 'vehicule');
                setCar(dataVehicule)
            } catch (error) {
                console.log(error);
                
            }
        }    
        dataVehicule();
        // return() => {

        // }
    }, [id, token])
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        // defaultValues: {
        //     marque : car.marque,
        //     modele : car.modele,
        //     type : car.type,
        //     couleur : car.couleur,
        //     nbPlaces : car.nbPlaces,
        //     kilometrage : car.kilometrage,
        //     moteur : car.moteur,
        //     embrayage : car.embrayage,
        //     plaque : car.plaque,
        //     prixLoc : car.marque,
        //     prixKm : car.prixKm,
        //     prixCaution : car.prixCaution,
        //     disponibilite : car.disponibilite,
        //     photo : car.photo,
        //     description : car.description
        // }
    })


    const AuSubmit = async(data) => {
        try {
                let [marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, photo, description, disponibilite] = watch([marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, photo, description, disponibilite])
            // console.log(values, 'all values');
            // console.log(getValues('prixLoc'), 'prixLoc');
            // console.log(getValues(), 'getValues');
            // if (!(photo instanceof File) || photo === "" ){
            //     console.log(('pas photo'));
            //     photo = car.photo
            // }else if(typeof photo == 'object'){

            // }else{
            //     console.log('photo');
            //     let reponse = await axios.post('api/upload', photo); 
            //     console.log(photo, typeof photo, 'photo');
            //     photo = reponse.url
            // }
               
            // description.trim() === "" ? description = car.description  : console.log(description, 'description');
            // console.log({marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite}, 'objet');
            
            // let res = await axios.put(`/api/vehicule/${id}`, {headers: {Authorization : token}},{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite})
            // let res = await axios.put(url, {headers: {Authorization : token}},{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution,description:description})
            // console.log(res, 'res');
        } catch (error) {
            console.log(error, "catch front");
        }
    }



    

    if (isAdmin) {
    // if (isAdmin || isSuperAdmin) {
      // console.log(car, 'car');
      return (
        <Box sx={{ m: 5, p: 3 }}>
          {/* <Box sx={{m:5, border:'black solid 2px', p:3}}> */}
          <Typography variant="h3" sx={{ mb: 5 }}>
            Edit vehicules
          </Typography>
          <form onSubmit={handleSubmit(AuSubmit)}>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                margin: "auto",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <TextField
                  {...register("marque")}
                  id="marque"
                  label="marque"
                  variant="filled"
                  placeholder={car.marque}
                  autoFocus={true}
                />
                <TextField
                  {...register("modele")}
                  id="modele"
                  label="modele"
                  variant="filled"
                  placeholder={car.modele}
                  multiline
                />
                <TextField
                  {...register("type")}
                  id="type"
                  label="type"
                  variant="filled"
                  placeholder={car.type}
                  multiline
                />
                <TextField
                  {...register("couleur")}
                  id="couleur"
                  label="couleur"
                  variant="filled"
                  placeholder={car.couleur}
                  multiline
                />
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}
              >
                <TextField
                  {...register("nbPlaces")}
                  id="nbPlaces"
                  label="nb de places"
                  variant="filled"
                  placeholder={String(car.nbPlaces)}
                />
                <TextField
                  {...register("kilometrage")}
                  id="kilometrage"
                  label="kilometrage"
                  variant="filled"
                  placeholder={String(car.kilometrage)}
                />
                <TextField
                  {...register("moteur")}
                  id="moteur"
                  label="moteur"
                  variant="filled"
                  placeholder={car.moteur}
                />
                <TextField
                  {...register("embrayage")}
                  id="embrayage"
                  label="embrayage"
                  variant="filled"
                  placeholder={car.embrayage}
                />
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}
              >
                <TextField
                  {...register("plaque")}
                  id="plaque"
                  label="plaque"
                  variant="filled"
                  placeholder={String(car.plaque)}
                />
                <TextField
                  {...register("prixLoc")}
                  id="prixLoc"
                  label="prix location(€)"
                  variant="filled"
                  placeholder={String(car.prixLoc)}
                />
                <TextField
                  {...register("prixKm")}
                  id="prixKm"
                  label="prix Km(€)"
                  variant="filled"
                  placeholder={String(car.prixKm)}
                />
                <TextField
                  {...register("prixCaution")}
                  id="prixCaution"
                  label="prix caution(€)"
                  variant="filled"
                  placeholder={String(car.prixCaution)}
                />
                {/* <TextField {...register("prixCaution", {required : 'Ce champ est requis'})} id="prixCaution" label="prix caution(€)" variant="filled" required={true} placeholder={String(car.prixCaution)}/>                               */}
              </Box>
              <Box sx={{ display: "flex", mt: 5, flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  {/* <TextField {...register("disponibilite")} type='checkbox' id="disponibilite" label="disponibilite" variant="filled" required={true} placeholder='dispo' sx={{mb:4, mr:2}}/>                 */}
                  <Box></Box>
                  <FormControlLabel
                    {...register("disponibilite")}
                    control={<Checkbox {...label} />}
                    label={"Disponible"}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      {...register("photo")}
                      variant="contained"
                      component="label"
                      sx={{ mb: 1 }}
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          setFileName(e.target.files[0].name);
                        }}
                        // onChange={(e)=>{e.preventDefault(); setFileName(e.target.files[0].name)}}
                      />
                    </Button>
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
                  <TextField
                    {...register("description")}
                    id="outlined-multiline-static"
                    label="description"
                    variant="filled"
                    placeholder={car.description}
                    sx={{ width: "100%" }}
                    rows={4}
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
      );
    }
    // else{
    else{
    // else if (!isAdmin && !isSuperAdmin) {
      console.log("hehe");
      return (
        <Box sx={{ m: 5, border: "black solid 2px" }}>
          Vous ne pouvez pas accéder à cette page car vous n'êtes pas
          administrateur
        </Box>
      );
    }
}

export default EditVehicule












// const AuSubmit = async(data) => {
//     try {
//         // let { marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, description } = data
//         let [marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, photo, description, disponibilite] = watch([marque, modele, type, couleur, nbPlaces, kilometrage, moteur, embrayage, plaque, prixLoc, prixKm, prixCaution, photo, description, disponibilite])
//         console.log(watch(modele, 'modele'));
//         // marque.trim() === "" ? marque = car.marque : console.log(marque, 'marque');
//         // modele.trim() === "" ? modele = car.modele  : console.log(modele, 'modele');
//         // type.trim() === "" ? type = car.type  : console.log(type, 'type');
//         // couleur.trim() === "" ? couleur = car.couleur  : console.log(couleur, 'couleur');
//         // nbPlaces.trim() === "" ? nbPlaces = car.nbPlaces  : console.log(nbPlaces, 'nbPlaces');
//         // kilometrage.trim() === "" ? kilometrage = car.kilometrage  : console.log(kilometrage, 'kilometrage');
//         // moteur.trim() === "" ? moteur = car.moteur  : console.log(moteur, 'moteur');
//         // embrayage.trim() === "" ? embrayage = car.embrayage  : console.log(embrayage, 'embrayage');
//         // plaque.trim() === "" ? plaque = car.plaque  : console.log(plaque, 'plaque');
//         // prixLoc.trim() === "" ? prixLoc = car.prixLoc  : console.log(prixLoc, 'prixLoc');
//         // prixKm.trim() === "" ? prixKm = car.prixKm  : console.log(prixKm, 'prixKm');
//         // prixCaution.trim() === "" ? prixCaution = car.prixCaution  : console.log(prixCaution, 'prixCaution');
//         // disponibilite === "" ? disponibilite = car.disponibilite  : console.log(disponibilite,'disponibilite');
//         // let watchMarque = watch("marque", car.marque);
//         // let watchModele = watch("modele", car.modele);
//         // let watchType = watch("type", car.type);
//         // let watchCouleur = watch("couleur", car.couleur);
//         // let watchNbPlaces = watch("nbPlaces", car.nbPlaces);
//         // let watchKilometrage = watch("kilometrage", car.kilometrage);
//         // let watchMoteur = watch("moteur", car.moteur);
//         // let watchEmbrayage = watch("embrayage", car.embrayage);
//         // let watchPlaqueprixLoc = watch("plaque", car.plaque);
//         // let watchPrixLoc = watch("prixLoc", car.marque);
//         // let watchPrixKm = watch("prixKm", car.prixKm);
//         // let watchPrixCaution = watch("prixCaution", car.prixCaution);
//         // let watchDisponibilite = watch("disponibilite", car.disponibilite);
//         if (!(photo instanceof File) || photo === "" ){
//             console.log(('pas photo'));
//             photo = car.photo
//         }else if(typeof photo == 'object'){

//         }else{
//             console.log('photo');
//             let reponse = await axios.post('api/upload', photo); 
//             console.log(photo, typeof photo, 'photo');
//             photo = reponse.url
//         }
           
//         description.trim() === "" ? description = car.description  : console.log(description, 'description');
//         console.log({marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite}, 'objet');
        
//         let res = await axios.put(`/api/vehicule/${id}`, {headers: {Authorization : token}},{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution, photo:photo, description:description, disponibilite:disponibilite})
//         // let res = await axios.put(url, {headers: {Authorization : token}},{marque : marque, modele:modele, type:type, couleur:couleur, nbPlaces:nbPlaces, kilometrage:kilometrage, moteur:moteur, embrayage:embrayage, plaque:plaque, prixLoc:prixLoc, prixKm:prixKm, prixCaution:prixCaution,description:description})
//         console.log(res, 'res');
//     } catch (error) {
//         console.log(error, "catch front");
//     }
// }
