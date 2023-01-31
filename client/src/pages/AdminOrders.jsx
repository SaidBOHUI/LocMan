import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../Components/GlobalState";
import { redirect, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
import AddIcon from '@mui/icons-material/Add';
import banner from '../assets/banners/road4.jpeg'
import { AiFillCar } from 'react-icons/ai';
import dayjs from 'dayjs';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
	Typography,
    DialogActions} from '@mui/material';
import axios from 'axios'


function AdminOrders(){
    const state = useContext(GlobalState)
	const [isAdmin, setIsAdmin] = state.userApi.isAdmin
	const [isLogged, setIsLogged] = state.userApi.isLogged
	const [dataUser, setDataUser] = state.userApi.dataUser
	const [userOrders, setUserOrders] = useState([]);
	// const [statutOrder, setStatutOrder] = useState('');
	const [isCancelled, setIsCancelled] = useState(false);
	const [openPhoto, setOpenPhoto] = useState(false);
	
	
	
	
	
    const [vehicules] = state.vehiculesApi.vehicules
	// const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isSuperAdmin
    const [token, setToken] = state.token
    const [showComponent, setShowComponent] = useState(true);
    const navigate = useNavigate();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        //   backgroundColor: '#263F46',
          backgroundColor: '#000000',
        //   backgroundColor: theme.palette.common.black,
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
    function handleOpenPhoto(){
        setOpenPhoto(true)
    }
    function handleClose (){
        setOpen(false)
    }
    function handleClosePhoto (){
        setOpenPhoto(false)
    }
	function redirection(){
		return navigate('/user/login', {state: {data: "Vous devez être connecté afin d'acceder à cette page"}})
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
    async function handleCancel(id){
        try {
			let config = {
				url : `/order/cancel/${id}`,
				method : 'PUT',
				headers : {
					Authorization:token
				}
			}
			let res = await axios(config)
			// let res = await axios.put(`/order/cancel/${id}`, {headers: {Authorization : token}})
			console.log(res.data, 'res');
			setOpen(false)
			setIsCancelled(!isCancelled)
            console.log(res, "Commande annulée");
            showSuccessMessage()
			return
            // return("Véhicule supprimé")
        } catch (error) {
            console.log(error)
        }
    }

	const Cross = (order)=>{
		if (order.statut !== 'cancelled' && order.statut !== 'started') {
			return(
				<>
					<IconButton color="primary" aria-label="delete-order" component="label" onClick={handleClickOpen}>
						<ClearIcon sx={{color: "#A91F3C"}}/>
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
							{"Annuler la commande"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Êtes-vous sûr de vouloir annuler cette commande ?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => { handleCancel(order._id) }} autoFocus>Oui</Button>
							<Button onClick={handleClose}>Non</Button>
						</DialogActions>
					</Dialog> 			
				</>
			)
		}
	}

	const Photo = (photo)=>{
		return(												
			<>
				<IconButton color="primary" aria-label="show photo" component="label" onClick={handleOpenPhoto}>
					{/* ??? */}
					<VisibilityIcon sx={{color : 'black'}}/>
				</IconButton>
				<Dialog
					open={openPhoto}
					onClose={handleClosePhoto}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					BackdropProps={{ invisible: true }}
					// PaperProps={{style: {boxShadow: 'none',}}}
					PaperProps={{style: {elevation: 1,}}}
				>
					<DialogContent>
						<img src={photo} alt="voiture" width='600px' height='300px' style={{textalign:'center'}}/>														
					</DialogContent>
					<DialogActions>
						{/* <Button onClick={() => { handleCancel(order._id) }} autoFocus>Oui</Button> */}
						<Button onClick={handleClosePhoto}>Fermer</Button>
					</DialogActions>
				</Dialog> 														
			</>
		)
	}

    useEffect(() => {
		const getOrders = async()=>{
			try {
				let res = await axios.get('/order/getAll', {headers : {Authorization: token}})
                console.log(res, 'res');
				let data = res.data.orders
                console.log(data, 'data');

				console.log(userOrders, 'USER ORDERS');
				if (data.length !== 0) {
					for (const order of data) {
						let reponse = await axios.get(`/api/vehicule/${order.vehicule}`,{headers: {Authorization: token}})
						order.voitureLouee = reponse.data.vehicule.marque+' '+reponse.data.vehicule.modele
						// console.log(reponse.data, 'reponse.data');
						order.photo = reponse.data.vehicule.photo.url
					}
				}
				setUserOrders(data)
			} catch (error) {
				console.log(error);
				return error
			}
		}
		getOrders()
        if (!isAdmin) {
            return navigate('/user/login')
        }
    }, [isLogged, isCancelled])
    
	useEffect(() => {
		if (!(localStorage.getItem("firstLogin") === "true") ||localStorage.getItem("firstLogin") !== "true") {
			console.log("in If");
			setTimeout(() => {
                navigate('/user/login');
			}, 5000)
		}else if (localStorage.getItem("firstLogin") === "true" && ((localStorage.getItem("roleUser") !== "1" || !localStorage.getItem("roleUser")))){
			console.log("in Elseif");
			setTimeout(() => {
                navigate('/');
			}, 5000)
		}
	}, [])
	

		if (isLogged && isLogged) {
			if (typeof userOrders === 'object' && userOrders.constructor === Array && userOrders.length !== 0) {
				return (
					<Box variant='container' sx={{minHeight: '100vh', background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
						<Box sx={{mb:5}}>
							<ColorButton aria-label="edit" startIcon={<DirectionsCarIcon />} sx={{display:'flex', alignItems: 'center', margin:'auto', mt:5, p:2}} onClick={() => navigate('/')}>
								Louer 
							</ColorButton>
							<Snackbar open={openSuccess} autoHideDuration={3000} onClose={hideSuccessMessage}>
								<Alert onClose={hideSuccessMessage} severity="success" sx={{ width: '100%' }}>
									Commande annulée avec succès
								</Alert>
							</Snackbar>
						</Box>
						<Box sx={{m:5}}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: '80%' }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>N° de commande</StyledTableCell>
											<StyledTableCell>photo</StyledTableCell>
											<StyledTableCell align="left">vehicule</StyledTableCell>
											<StyledTableCell align="left">date début</StyledTableCell>
											<StyledTableCell align="left">date fin</StyledTableCell>
											<StyledTableCell align="left">prix ht</StyledTableCell>
											<StyledTableCell align="left">Prix ttc</StyledTableCell>
											<StyledTableCell align="left">Statut</StyledTableCell>
											<StyledTableCell align="center">Actions</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{userOrders.map((order) => (
											<StyledTableRow key={order._id}>
												<StyledTableCell align="left">{order._id.substring(0,9)+'...'}</StyledTableCell>
												<StyledTableCell align="left">{Photo(order.photo)}</StyledTableCell>
												<StyledTableCell component="th" scope="row">
												{/* {order.vehicule+' '+order.vehicule} */}{order.voitureLouee}
												</StyledTableCell>
												<StyledTableCell align="left">{dayjs(order.startDate).format('DD/MM/YYYY')}</StyledTableCell>
												<StyledTableCell align="left">{dayjs(order.endDate).format('DD/MM/YYYY')}</StyledTableCell>
												<StyledTableCell align="left">{order.priceHT}€</StyledTableCell>
												<StyledTableCell align="left">{order.priceTTC}€</StyledTableCell>
												<StyledTableCell align="left">{order.statut}</StyledTableCell>
												<StyledTableCell align="left">
													<Box sx={{display: "flex", justifyContent: "space-around"}}>
															{Cross(order)}													
													</Box>
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Box>
				)
			}else{
				return (
					<Box variant='container' sx={{minHeight: '100vh', background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
						<Box sx={{m:10, color : 'white', fontSize: 20, fontWeight: "bold" }}>
							Vous n'avez encore jamais loué de véhicule sur ce compte, cliquez sur le bouton pour voir nos vehicules
							<ColorButton aria-label="edit" size="large" startIcon={<DirectionsCarIcon />} sx={{display:'flex', alignItems: 'center', margin:'auto', mt:5, p:2}} onClick={() => navigate('/')}>
								Louer
							</ColorButton>
						</Box>
					</Box>
				)
			}
		}
    }
      

export default AdminOrders