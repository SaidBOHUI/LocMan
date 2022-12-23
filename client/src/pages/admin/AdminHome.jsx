import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../Components/GlobalState";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
// import Redirect from 'react-router-dom';



import { Box,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Alert,
    Snackbar,
    DialogActions} from '@mui/material';
import axios from 'axios'


function AdminHome(){
    const state = useContext(GlobalState)
	const [isAdmin, setIsAdmin] = state.userApi.isAdmin
	const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isSuperAdmin
    const [token, setToken] = state.token

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));

    const [vehicules, setVehicules] = useState([])
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    function showSuccessMessage(){
        setOpenSuccess(true);
    }
    
    function hideSuccessMessage(){
        setOpenSuccess(false);
    };

    function handleClickOpen(){
        setOpen(true)
    }

    function handleClose (){
        setOpen(false)
    }

    const getVehicules = async() => {
        try {
          let options = {
            url : 'http://localhost:8000/api/vehicules',
            method:'GET',
            headers : {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
          }
          let res = await axios(options)
          setVehicules(res.data.vehicules)
        } catch (error) {
          console.log(error)
        }
    }


    async function handleDelete (id){
        try {
        let res = await axios.delete(`/api/vehicules/${id}`, {headers: {Authorization : token}})
        setOpen(false)
            console.log(res, "Véhicule supprimé");
            getVehicules()
            showSuccessMessage()
            // return("Véhicule supprimé")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getVehicules()
      }, [])


        if (!isAdmin && !isSuperAdmin) {
            // if (isLogged && (isAdmin || isSuperAdmin) ) {
                    // return (<Redirect to="/" />)
                return(
                    <Box sx={{m:5, mtop:0, p:5}}>
                        {/* La récupération des véhicules a échouée */}
                        Vous n'avez pas l'autorisation d'acceder à cette page

                    </Box>
                )
        }else{
            if (typeof vehicules === 'object' && vehicules.constructor === Array && vehicules.length !== 0) {
                return (
                    <>
                        <Box sx={{mb:5}}>
                        {/* <Alert severity="success" onClose={hideSuccessMessage} autoHideDuration={3000} variant="filled">
                            Véhicule supprimé avec succès !
                        </Alert> */}
                        <Snackbar open={openSuccess} autoHideDuration={3000} onClose={hideSuccessMessage}>
                            <Alert onClose={hideSuccessMessage} severity="success" sx={{ width: '100%' }}>
                            Véhicule supprimé avec succès !
                            </Alert>
                        </Snackbar>
                        </Box>
                        <Box sx={{m:5}}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: '80%' }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Modèle</StyledTableCell>
                                        <StyledTableCell align="left">Plaque</StyledTableCell>
                                        <StyledTableCell align="left">Disponibilité</StyledTableCell>
                                        <StyledTableCell align="left">Type</StyledTableCell>
                                        <StyledTableCell align="left">Prix Loc</StyledTableCell>
                                        <StyledTableCell align="left">Prix km</StyledTableCell>
                                        <StyledTableCell align="left">Prix Caution</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vehicules.map((vehicule) => (
                                    <StyledTableRow key={vehicule.plaque}>
                                        <StyledTableCell component="th" scope="row">
                                        {vehicule.marque+' '+vehicule.modele}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.plaque}</StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.disponibilite === true ? "Disponible" : "Non-disponible"}</StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.type}</StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.prixLoc} €</StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.prixKm} €</StyledTableCell>
                                        <StyledTableCell align="left">{vehicule.prixCaution} €</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Box sx={{display: "flex", justifyContent: "space-around"}}>
                                                <IconButton aria-label="edit" sx={{color: "#214461"}}>
                                                    <BrushIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" sx={{color: "#A91F3C"}} onClick={handleClickOpen}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    BackdropProps={{ invisible: true }}
                                                    // PaperProps={{style: {boxShadow: 'none',}}}
                                                    PaperProps={{style: {elevation: 1,}}}
                                                    >
                                                    <DialogTitle id="alert-dialog-title">
                                                    {"Suppression d'un véhicule du parc"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Êtes-vous sûr de vouloir supprimer cet élément ?
                                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                    <Button onClick={handleClose}>Annuler</Button>
                                                    <Button onClick={() => { handleDelete(vehicule._id) }} autoFocus>Supprimer</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </>
                )
            }else{
                return ("La récupération des véhicules a échouée")
            }
        }
    }
      

export default AdminHome