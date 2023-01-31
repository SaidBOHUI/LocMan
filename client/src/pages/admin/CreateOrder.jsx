import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Typography, Select, MenuItem, Grid, Button } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { GlobalState } from "../../Components/GlobalState";
import banner from "../../assets/banners/road3.jpeg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import VehiculeCard from "../../Components/VehiculeCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import EvStationIcon from "@mui/icons-material/EvStation";
import { TbManualGearbox } from "react-icons/tb";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import axios from "axios";
import Header from "../../Components/header/header";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function CreateOrder() {
  const location = useLocation();
  const vehicule = location.state.data;
  const state = useContext(GlobalState);
  const [dataUser, setDataUser] = state.userApi.dataUser;
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [token, setToken] = state.token
  const id = useParams().id
  const {handleSubmit,formState: { errors }} = useForm();
//   let ajd = new Date().toISOString().split('.')[0]
//   let dem = (new Date()).toISOString().split('.')[0]
  const [valueStart, setValueStart] = useState(dayjs().add(1, 'day'));
  const [valueEnd, setValueEnd] = useState(dayjs().add(2, 'day'));
  const [helpDebut, setHelpDebut] = useState();
  const [helpFin, setHelpFin] = useState();
  const [nbJours, setNbJours] = useState(valueEnd.diff(valueStart, 'day'));
  const [prixHt, setPrixHt] = useState();
  const [prixTtc, setPrixTtc] = useState();
  const [dataOrders, setDataOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  
  
  
  const handleChangeStart = (newValue) => {
	setValueStart(newValue);
  }
  const handleChangeEnd = (newValue) => {
	setValueEnd(newValue);
  }

  const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText('#9C27B0'),
	backgroundColor: '#A47E46',
	'&:hover': {
	  backgroundColor: "#EAB464",
	},
  }));


  useEffect(() => {
    const getOrders = async()=>{
      try {
		if (!isLogged) {
			navigate('/user/login')
		}else{
			let arrOrders = await axios.get('/order/takenDates',{headers : {Authorization : token}})
			console.log(arrOrders, 'arrOrders' );
			setDataOrders(arrOrders.data.orders)
		}
      } catch (error) {
        console.log(error);
        return error
      }
    }  
    getOrders();
  }, [])



  
  useEffect(() => {
	valueEnd.diff(valueStart, 'day') !== 0 ? setNbJours(valueEnd.diff(valueStart, 'day')) : setNbJours(1)
	setPrixHt((vehicule.baseFixe + (nbJours * vehicule.prixJour)).toFixed(2));
	setPrixTtc(((vehicule.baseFixe + (nbJours * vehicule.prixJour)) * 1.20).toFixed(2))
}, [valueStart, valueEnd, nbJours]);


  function startDisable(date) {
	try {
		const today = dayjs(new Date())
		// console.log(dataOrders, 'dataOrders');
		dataOrders.forEach((order) => {
			if (!dayjs(order.startDate).isValid()) {
				throw new Error("Invalid start date format in dataOrders");
			}
			if (!dayjs(order.endDate).isValid()) {
				throw new Error("Invalid end date format in dataOrders");
			}
		});
		let disabled = dataOrders.filter(order => dayjs(date).isBetween(dayjs(order.startDate), dayjs(order.endDate), 'day', '[]'));
		// return today.isSame(date, 'day')	
		return today.isSame(date, 'day') || disabled.length>0;		
	} catch (error) {
		console.log(error);
		return error
	}
  }

  function endDisable(date) {
	dataOrders.forEach((order) => {
		if (!dayjs(order.startDate).isValid()) {
			throw new Error("Invalid start date format in dataOrders");
		}
		if (!dayjs(order.endDate).isValid()) {
			throw new Error("Invalid end date format in dataOrders");
		}
	});
	let disabled = dataOrders.filter(order => dayjs(date).isBetween(dayjs(order.startDate), dayjs(order.endDate), 'day', '[]'));

	// const today = dayjs(new Date())
	return date.isBefore(valueStart) || disabled.length>0 || date.isSame(valueStart);
  }

  const onSubmitKm = async () => {};

  async function handleJour (){
    try {
      let objToPost = {
        startDate: valueStart, 
        endDate: valueEnd,
        nbJours: nbJours,
        priceHT: prixHt,
        priceTTC: prixTtc,
        forfait: 'jour',
        vehicule:id,
        user:dataUser._id
      }	
      let create = await axios.post('/order/create', objToPost, {headers : {Authorization : token}})
      console.log(create, 'create');
	  navigate(`/order/Payement`, {state: {data: create._id}})

    } catch (error) {
      console.log(error.response.data.msg);
	  setErrorMsg(error.response.data.msg)
      return error
    }
  } 

//   console.log(dataOrders,'dataOrders' );
//   console.log(isLogged, 'isLogged');

	return (
	<ThemeProvider theme={darkTheme}>
		<Box
		variant="container"
		sx={{
			height: "100vh",
			background: `url(${banner})`,
			// background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "cover",
		}}
		>
		<Box
			sx={{
			borderRadius: "50px",
			m: 10,
			background:
				"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
			p: 5,
			boxShadow: "0 0 5px 5px white",
			}}
		>
			<Typography
			variant="h4"
			sx={{ color: "white", textAlign: "center", mb: 4 }}
			>
			Mes informations
			</Typography>
			<Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 3 }}>
			<TextField
				helperText="nom"
				placeholder={`${dataUser.lastName}`}
				variant="outlined"
				disabled
			></TextField>
			<TextField
				helperText="prenom"
				placeholder={`${dataUser.firstName}`}
				variant="outlined"
				disabled
			></TextField>
			<TextField
				helperText="email"
				placeholder={`${dataUser.email}`}
				variant="outlined"
				disabled
			></TextField>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 3 }}>
			<TextField
				helperText="adresse"
				placeholder={`${dataUser.adresse}`}
				variant="outlined"
				disabled
			></TextField>
			<TextField
				helperText="cp"
				placeholder={`${dataUser.CP}`}
				variant="outlined"
				disabled
			></TextField>
			<TextField
				helperText="ville"
				placeholder={`${dataUser.city}`}
				variant="outlined"
				disabled
			></TextField>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
			<TextField
				helperText="n° de permis"
				placeholder={`${dataUser.permisNum}`}
				variant="outlined"
				disabled
			></TextField>
			<TextField
				helperText="tel"
				placeholder={`${dataUser.tel}`}
				variant="outlined"
				disabled
			></TextField>
			</Box>
		</Box>
		<Box
			sx={{
			borderRadius: "50px",
			m: 10,
			background:
				"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
			p: 5,
			boxShadow: "0 0 5px 5px white",
			}}
		>
			<Typography
			variant="h4"
			sx={{ color: "white", textAlign: "center", mb: 4 }}
			>
			{vehicule.type +
				" : " +
				vehicule.marque +
				" " +
				vehicule.modele +
				" " +
				vehicule.couleur}
			</Typography>
			<Box sx={{ display: "flex" }}>
			<Box sx={{ maxWidth: "500px" }}>
				<img
				src={vehicule.photo.url}
				alt="vehicule"
				style={{ maxWidth: "100%" }}
				/>
			</Box>
			<Box>
				<Box
				sx={{
					display: "flex",
					mb: 3,
					alignItems: "center",
					justifyContent: "space-evenly",
					color: "white",
				}}
				>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					<GroupsIcon
					sx={{
						verticalAlign: "bottom",
						height: "30px",
						width: "30px",
					}}
					/>
					: {vehicule.nbPlaces} sièges
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					{vehicule.moteur === "essence" ? (
					<LocalGasStationIcon
						sx={{
						verticalAlign: "bottom",
						height: "30px",
						width: "30px",
						}}
					/>
					) : (
					<EvStationIcon sx={{ verticalAlign: "bottom" }} />
					)}
					: {vehicule.moteur}
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					<TbManualGearbox
					size={30}
					style={{ verticalAlign: "bottom" }}
					/>
					: {vehicule.embrayage}
				</Typography>
				</Box>
				<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-evenly",
					color: "white",
				}}
				>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					Base fixe : {vehicule.baseFixe} €
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					prix/Km : {vehicule.prixKm} €
				</Typography>
				<Typography sx={{ fontSize: 20, fontWeight: "bold", m: 5 }}>
					prix/J : {vehicule.prixJour} €
				</Typography>
				</Box>
			</Box>
			</Box>
		</Box>
		<Box
			sx={{
			borderRadius: "50px",
			m: 10,
			background:
				"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
			p: 5,
			boxShadow: "0 0 5px 5px white",
			}}
		>
			<Typography
			variant="h4"
			sx={{ color: "white", textAlign: "center", mb: 4 }}
			>
			Ma Commande
			</Typography>
			<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
			//   height: "20vh",
				p:5
			}}
			>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Box sx={{ border: "white 2px solid", mr: 3 }}>
						<Typography variant='h5' sx={{color:'white', textAlign:'center', fontSize: 20, fontWeight: "bold", m: 4}}>
							Formule Km
						</Typography>
					<form onSubmit={handleSubmit(onSubmitKm)}>
						{/* <Controller
						render={({ forfait }) => (
							<TextField
							{...register("forfait")}
							id="forfait"
							helperText="forfait"
							variant="outlined"
							required
							select
							// size={"large"}
							// sx={{ width: "18%" }}
							>
							{forfaits.map((option) => (
								<MenuItem key={option.value} value={option.value}>
								{option.label}
								</MenuItem>
							))}
							</TextField>
						)}
						name={"forfait"}
						control={control}
						helperText={"forfait"}
						fullWidth
						placeholder='Forfait'
						/> */}
					</form>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box sx={{ border: "white 2px solid", ml: 3 }}>
						<Typography variant='h5' sx={{color:'white', textAlign:'center', fontSize: 20, fontWeight: "bold", m: 4}}>
							Formule Jour
						</Typography>
						<Box sx={{mb:2}}>
							<Typography variant="span" sx={{color:'white', ml:3}}>{errorMsg}</Typography>
						</Box>
						<form onSubmit={handleSubmit(onSubmitKm)}>
							<Box sx={{display:'flex', justifyContent:'space-around'}}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Grid item xs={12} md={5}>
										<DesktopDatePicker
										closeOnSelect
										disablePast
										inputFormat="DD/MM/YYYY"
										value={valueStart}
										shouldDisableDate={startDisable}
										onChange={handleChangeStart}
										renderInput={(params) => <TextField {...params} helperText="Début de location" />}
										/>                            
									</Grid>
								</LocalizationProvider>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Grid item xs={12} md={5}>
										<DesktopDatePicker
										// label="Date desktop"
										closeOnSelect
										disablePast
										inputFormat="DD/MM/YYYY"
										value={valueEnd}
										shouldDisableDate={endDisable}
										onChange={handleChangeEnd}
										renderInput={(params) => <TextField {...params} helperText="Fin de location"/>}
									/>                            
									</Grid>
								</LocalizationProvider>
							</Box>
							<Box sx={{display:'flex', flexDirection:'Column', color:'white'}}>
								<Typography variant='span' sx={{m:4, mt:5, fontSize: 20, fontWeight: "bold"}}>Nb de jours : {nbJours <= 0 ? 'Dates incorrectes' : nbJours}</Typography>
								<Typography variant='span' sx={{m:4, fontSize: 20, fontWeight: "bold"}}>Prix HT :  { nbJours <= 0 ? 'Indisponible' : prixHt} €</Typography>
								<Typography variant='span' sx={{m:4, fontSize: 20, fontWeight: "bold"}}> Prix TTC : { nbJours <= 0 ? 'Indisponible' : prixTtc} €</Typography>
							</Box>
							<Box sx={{display:'flex', justifyContent:'center', alignItem:'center', m:5}}>
								<ColorButton variant="outlined" onClick={handleJour}>Valider la commande</ColorButton>
							</Box>
						</form>
					</Box>
				</Grid>
			</Grid>
			{/* <Box sx={{ border: "white 2px solid", ml: 3 }}></Box> */}
			</Box>
		</Box>
		</Box>
	</ThemeProvider>
	);	
  
}

export default CreateOrder;
