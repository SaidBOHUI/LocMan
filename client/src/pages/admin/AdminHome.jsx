import React, {useState, useEffect, useContext} from "react";
import { Box, Typography, CardContent, CardMedia, Card, CardActions, Button } from "@mui/material";
import axios from "axios";
import banner from "../../assets/banners/road5.jpeg";
import { GlobalState } from "../../Components/GlobalState";
import { redirect, useNavigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import bannerVehicules from "../../assets/banners/bannerAdmin1.jpeg"
import bannerOrders from "../../assets/banners/bannerAdmin2.jpeg"
import HomeIcon from '@mui/icons-material/Home';

function AdminHome() {
	const state = useContext(GlobalState)
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [dataUser, setDataUser] = state.userApi.dataUser;
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();


// const Interdiction = () => {
// 	return (
// 		<Box
// 		variant="container"
// 		sx={{
// 			minHeight: "100vh",
// 			background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
// 			backgroundRepeat: "no-repeat",
// 			backgroundPosition: "center",
// 			backgroundSize: "cover",
// 		}}
// 		>
// 			<Box sx={{fontSize: 30, fontWeight: "bold", color:'white', m:5}}>
// 				{/* La récupération des véhicules a échouée */}
// 				Vous n'avez pas l'autorisation d'acceder à cette page. Vous allez être redirigé vers la page d'accueil
// 			</Box>
// 			<Box sx={{display:'flex', justifyContent:'center'}}>
// 				<Button variant="contained" size="large" onClick={() => {navigate('/')}}>
// 					<HomeIcon size={24} />
// 				</Button>
// 			</Box>
// 		</Box>
// 	)
// }
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

	
	if ((localStorage.getItem("firstLogin") === "true") && localStorage.getItem("roleUser") === "1"){
		return(
			<Box
			variant="container"
			sx={{
				minHeight: "100vh",
				background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			>
				<Box sx={{ p: 4 }}>
					<Typography sx={{fontSize: 30, fontWeight: "bold", color:'white', m:5}}>
						Bonjour {dataUser.firstName} !
					</Typography>
				</Box>
				<Box sx={{display:'flex', width:'80%', m:'auto', justifyContent:'space-evenly'}}>
					<Box>
						<Card sx={{ maxWidth: 345, borderRadius:'50px' }}>
							<CardMedia
								component="img"
								alt="green iguana"
								height="250"
								image={bannerVehicules}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									vehicules
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" onClick={()=>{navigate('/admin/vehicules')}}>Gérer</Button>
							</CardActions>
						</Card>
					</Box>
					<Box>
						<Card sx={{ maxWidth: 345, borderRadius:'50px' }}>
							<CardMedia
								component="img"
								alt="green iguana"
								height="250"
								image={bannerOrders}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Commandes
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" onClick={()=>{navigate('/admin/orders')}}>Gérer</Button>
							</CardActions>
						</Card>
					</Box>
				</Box>
			</Box>
		)
	}else if (localStorage.getItem("firstLogin") === "true" && (!localStorage.getItem("roleUser") || localStorage.getItem("roleUser") !== "1")){
		return(
			<Box
			variant="container"
			sx={{
				minHeight: "100vh",
				background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			>
				<Box sx={{fontSize: 30, fontWeight: "bold", color:'white', m:5}}>
					{/* La récupération des véhicules a échouée */}
					Vous n'avez pas l'autorisation d'acceder à cette page. Vous allez être redirigé vers la page d'accueil
				</Box>
				<Box sx={{display:'flex', justifyContent:'center'}}>
					<Button variant="contained" size="large" onClick={() => {navigate('/')}}>
						<HomeIcon size={24} />
					</Button>
				</Box>
			</Box>
		)
	}
	else{
		return(
			<Box
			variant="container"
			sx={{
				minHeight: "100vh",
				background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			>
				<Box sx={{fontSize: 30, fontWeight: "bold", color:'white', m:5}}>
					{/* La récupération des véhicules a échouée */}
					Vous devez vous connecter afin d'accéder à cette page
				</Box>
				<Box sx={{display:'flex', justifyContent:'center'}}>
					<Button variant="contained" size="large" onClick={() => {navigate('/')}}>
						<HomeIcon size={24} />
					</Button>
				</Box>
			</Box>
		)
	}
}

export default AdminHome;
