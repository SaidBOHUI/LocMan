import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../Components/GlobalState";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
import AddIcon from '@mui/icons-material/Add';
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
    Link,
    DialogActions} from '@mui/material';
import axios from 'axios'


function AdminHome(){
    const state = useContext(GlobalState)
	const [isAdmin, setIsAdmin] = state.userApi.isAdmin
    const [vehicules] = state.vehiculesApi.vehicules
	// const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isSuperAdmin
    const [token, setToken] = state.token
    const [showComponent, setShowComponent] = useState(true);
    const navigate = useNavigate();

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
      
      const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#9C27B0'),
        backgroundColor: '#9C27B0',
        '&:hover': {
          backgroundColor: "#7B1EA2",
        },
      }));
      

    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    function showSuccessMessage(){
        setOpenSuccess(true);
    }
    function hideSuccessMessage(){
        setOpenSuccess(false);
    }
    function handleClickOpen(){
        setOpen(true)
    }
    function handleClose (){
        setOpen(false)
    }
    // const getVehicules = async() => {
    //     try {
    //       let options = {
    //         url : 'http://localhost:8000/api/vehicules',
    //         method:'GET',
    //         headers : {
    //           "Content-Type" : "application/json",
    //           "Accept" : "application/json"
    //         },
    //       }
    //       let res = await axios(options)
    //       setVehicules(res.data.vehicules)
    //     } catch (error) {
    //       console.log(error)
    //     }
    // }
    async function handleDelete (id){
        try {
        let res = await axios.delete(`/api/vehicule/${id}`, {headers: {Authorization : token}})
        setOpen(false)
            console.log(res, "Véhicule supprimé");
            // getVehicules()
            showSuccessMessage()
            // return("Véhicule supprimé")
        } catch (error) {
            console.log(error)
        }
    }

    // function noAdminReject(){
    //     if (condition) {
            
    //     }
    // }

    function goToEdit(id){
        navigate(`/admin/vehicule/${id}`, {state: {id: id}})
    }

    function goToCreate(){
        navigate('/admin/vehicule/create')
    }

    useEffect(() => {
        // getVehicules()
        if (!isAdmin) {
        // if (!isAdmin && !isSuperAdmin) {
            const timer = setTimeout(() => {
                setShowComponent(false);
                navigate('/');
              }, 5000); // 5 seconds          
            return () => clearTimeout(timer);            
        }
      }, [showComponent])

        if (!isAdmin) {
        // if (!isAdmin && !isSuperAdmin) {
                    if (!showComponent) {
                        return (
                            <Box sx={{m:5, mtop:0, p:5}}>
                                {/* La récupération des véhicules a échouée */}
                                Vous n'avez pas l'autorisation d'acceder à cette page. Vous allez être redirigé vers la page d'accueil
                            </Box>
                        )
                    }
        }else{
            if (typeof vehicules === 'object' && vehicules.constructor === Array && vehicules.length !== 0) {
                return (
                    <>
                    {/* <Box sx={{display:'flex', alignItems:'center'}}> */}
                    {/* </Box> */}
                        <Box sx={{mb:5}}>
                        {/* <IconButton variant="outlined" startIcon={<AddIcon />} sx={{display:'flex', alignItems: 'center', margin:'auto', mt:5}}> 
                            <Link to='/' sx={{textDecoration:"none"}}>
                                Ajouter
                            </Link>
                        </IconButton> */}
                        <ColorButton aria-label="edit" startIcon={<AddIcon />} sx={{display:'flex', alignItems: 'center', margin:'auto', mt:5}} onClick={() => goToCreate()}>
                            Ajouter
                        </ColorButton>


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
                                                {/* <Link to = "/admin/vehicules/edit"> */}
                                                    <IconButton aria-label="edit" sx={{color: "#214461"}} onClick={() => goToEdit(vehicule._id)}>
                                                        <BrushIcon />
                                                    </IconButton>
                                                {/* </Link> */}
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