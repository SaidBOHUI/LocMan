import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box,Grid,Typography,TextField, IconButton, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EvStationIcon from '@mui/icons-material/EvStation';
import { TbManualGearbox } from 'react-icons/tb'
import { FaYoutube } from 'react-icons/fa'
import { GiRoad } from 'react-icons/gi'
import banner from '../assets/banners/road1.jpeg'
import { GiCarKey } from 'react-icons/gi';





function VehiculeDetails(props) {
    const location = useLocation();
    const navigate = useNavigate()
    const vehicule = location.state.data
    let ajd = new Date().toISOString().split('.')[0]
    let dem = (new Date()).toISOString().split('.')[0]
    console.log(ajd, 'ajd');
    const [valueStart, setValueStart] = React.useState(dayjs(ajd));
    const [valueEnd, setValueEnd] = React.useState(dayjs(ajd));
    const handleChangeStart = (newValue) => {
      setValueStart(newValue);
    };
    const handleChangeEnd = (newValue) => {
      setValueEnd(newValue);
    };

console.log(vehicule);
    // console.log(vehicule);
  return (
    <Grid
      container
      // spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* sx={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to right top, #000000, #331527, #56255a, #60429d, #126aeb)'}}> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {vehicule.marque + " " + vehicule.modele}
          </Typography>
          <Box sx={{ alignContent: "center", borderRadius: "40px", m: 5 }}>
            <img
              src={`${vehicule.photo.url}`}
              height="100%"
              width="100%"
              alt={`${vehicule.marque} ${vehicule.modele}`}
            />
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Catégorie : {vehicule.type}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          {/* <Box sx={{m:3, alignContent:'center', borderRadius:'40px'}}> */}
          {/* <Box sx={{m:3, alignContent:'center', borderRadius:'40px', border:'solid black 2px'}}> */}
          <Box
            sx={{
              display: "flex",
              mb: 5,
              alignItems: "center",
              justifyContent: "space-evenly",
              p: 5,
            }}
          >
            {/* <Typography sx={{fontSize:20, fontWeight:'bold'}}>
                                    <ColorLensIcon sx={{verticalAlign: 'bottom', fontSize:'50'}}/> : {vehicule.couleur}
                                </Typography> */}
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              <GroupsIcon
                sx={{ verticalAlign: "bottom", height: "30px", width: "30px" }}
              />
              : {vehicule.nbPlaces} sièges
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
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
              )}{" "}
              : {vehicule.moteur}
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              <TbManualGearbox size={30} style={{ verticalAlign: "bottom" }} />{" "}
              : {vehicule.embrayage}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 5,
              mb: 5,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            {/* <Typography sx={{fontSize:20, fontWeight:'bold'}}>
                                    <GiRoad sx={{verticalAlign: 'bottom'}}/> : {vehicule.kilometrage} km
                                </Typography> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 5,
              mb: 5,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              Base fixe : {vehicule.baseFixe} €
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 5,
              mb: 5,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ textAlign: "left" }}>
              prix au km : {vehicule.prixKm} €
            </Typography>
            <Typography>prix à la journée : {vehicule.prixJour} €</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 5,
              mb: 5,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
            }}
          >
            {/* <Button
                            variant='contained'
                                aria-label="Louer"
                                onClick={() => {navigate(`/vehicule/${vehicule._id}`, {state: {data: vehicule}})}}
                                sx={{border : "white solid 2px", background: 'white', with:'3rem'}}
                            >
                                <MdCarRental />                    
                            </Button> */}
            <Button variant="contained"
                onClick={() => {navigate(`/order/${vehicule._id}`, {state: {data: vehicule}})}}
            >
              Louer <GiCarKey size={24} />
            </Button>
          </Box>

          {/* <Box sx={{display:'flex', justifyContent:'space-around', m:5}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid item xs={12} md={4}>
                                        <DesktopDatePicker
                                        closeOnSelect
                                        disablePast
                                        inputFormat="MM/DD/YYYY"
                                        value={valueStart}
                                        onChange={handleChangeStart}
                                        renderInput={(params) => <TextField {...params} helperText="Début de location"/>}
                                        />                            
                                    </Grid>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid item xs={12} md={4}>
                                        <DesktopDatePicker
                                        // label="Date desktop"
                                        closeOnSelect
                                        disablePast
                                        inputFormat="MM/DD/YYYY"
                                        value={valueEnd}
                                        onChange={handleChangeEnd}
                                        renderInput={(params) => <TextField {...params} helperText="Fin de location"/>}
                                        />                            
                                    </Grid>
                                </LocalizationProvider>

                            </Box> */}
          {/* </Box> */}
          {/* <Box sx={{border : 'white solid 2px', width:'4rem'}}> */}
          {/* </Box> */}
        </Grid>
      </Box>
    </Grid>
  );
}

export default VehiculeDetails