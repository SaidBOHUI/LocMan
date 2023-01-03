import CategoryCard from "../Components/categoryCard"
import { Container, Stack, Grid, Item, Typography, IconButton,Box, Button, TextField, InputAdornment} from '@mui/material';
// import { AirportShuttleIcon, SearchIcon} from '@mui/icons-material';
import banner from '../assets/banners/banner7.png';
import { useState, useContext } from "react";
import { GlobalState } from "../Components/GlobalState";


const Home = () => {
    const [etatBts, setEtatBts] = useState(true)
    const [carColor, setCarColor] = useState('#FFFFFF')
    const [carBg, setCarBg] = useState('#490648')
    const [camColor, setCamColor] = useState('#000000')
    const [camBg, setCamBg] = useState('#FFFFFF')
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userApi.isLogged;
    const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
	// const [isSuperAdmin, setIsSuperAdmin] = state.userApi.isLogged



    const handleLilButtons = ()=> {
        setEtatBts(!etatBts)
        if (etatBts === true) {
            setCarColor('#FFFFFF')
            setCarBg('#490648')
            setCamColor('#000000')
            setCamBg('#FFFFFF')
        }else{
            setCarColor('#000000')
            setCarBg('#FFFFFF')
            setCamColor('#FFFFFF')
            setCamBg('#490648')
        }
    }

    return(
        // <CategoryCard />
        <>
        <Container maxWidth="xl" sx={{border:"2px solid black", backgroundColor:'#000000', height:'100vh', padding:'3rem', backgroundImage:`url(${banner})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height:'100vh'}} >
        {/* , backgroundAttachment: 'fixed' */}
            <Box></Box>
            <Box sx={{height:'25vh' , border: 'solid 2px white', m:3, p:2, background: '#FFFFFF'}}>
                <Box sx={{m :2}}>
                    <Button variant="contained" component="label" sx={{backgroundColor:{carBg}, borderRadius:'20px'}} onClick={handleLilButtons}>
                    {/* <AirportShuttleIcon /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 10">
                        <path fill={carColor} fillRule="evenodd" d="M10.067.001h7.024l.3.404 1.76 2.365H22v4.45l-.635.249-1.821.714c-.299 1.029-1.22 1.816-2.368 1.816-1.043 0-1.898-.649-2.27-1.538H6.505c-.372.89-1.227 1.538-2.27 1.538S2.338 9.35 1.965 8.46H0V5.415l.41-.3 2.94-2.152.264-.193h2.923L9.795.215 10.067 0zm-.29 2.769h2.846l.244-.77h-2.11l-.98.769zM14.968 2l-.245.769h1.935L16.087 2h-1.12zM4.05 4.93c.06-.005.123-.007.185-.007 1.043 0 1.898.648 2.27 1.538h8.402c.372-.89 1.227-1.538 2.27-1.538.912 0 1.68.495 2.107 1.214L20 5.856V4.77H4.268l-.218.16zm.185 1.993c-.218 0-.47.198-.47.538s.252.538.47.538c.219 0 .471-.199.471-.538 0-.34-.252-.538-.47-.538zm12.942 0c-.218 0-.47.198-.47.538s.252.538.47.538c.218 0 .47-.199.47-.538 0-.34-.252-.538-.47-.538z" clipRule="evenodd">
                        </path>
                    </svg>
                    </Button>            
                    <Button variant="contained" component="label" sx={{ml: 2, backgroundColor:{camBg}, borderRadius:'40px'}} onClick={handleLilButtons}>
                    {/* <AirportShuttleIcon /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 12">
                        <path fill={camColor} fillRule="evenodd" d="M3.574 0h18.427v8.856l-.531.283-1.508.8a2.502 2.502 0 01-4.754.566H6.792a2.502 2.502 0 01-4.582 0H0V6.107l.315-.296 1.318-1.24L3.315.607 3.575 0zm-.706 6.153L2 6.97v1.536h.209a2.502 2.502 0 014.582 0h8.418a2.502 2.502 0 014.242-.56l.55-.291V2H8.47v4.153H2.868zM6.47 2H4.897l-.915 2.153h2.49V2zM4.501 9.01c-.28 0-.5.225-.5.495s.22.495.5.495c.279 0 .5-.225.5-.495s-.221-.495-.5-.495zm13 0c-.28 0-.5.225-.5.495s.22.495.5.495a.497.497 0 00.495-.556.499.499 0 00-.496-.434z" clipRule="evenodd">
                        </path>
                    </svg>            
                    </Button>            
                </Box>
                <Box sx={{mb :1, border:'black solid 1px'}}></Box>
                <Box>
                    <TextField
                        id="input-with-icon-textfield"
                        label="TextField"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/* <SearchIcon /> */}
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </Box>
            </Box>

            {/* <Typography variant="h3" color={'#FFFFFF'} align={'center'} gutterBottom={true}>
                Qui sommes-nous ?
            </Typography>              */}
            {/* <Typography variant="body1" color={'#A5291D'} align={'justify'} gutterBottom={true} sx={{padding: '0 5rem'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatem, rem aperiam quos iure placeat provident hic consequatur nobis minima in debitis sunt ducimus rerum! Omnis dolor velit ipsum dolores!
                Id eaque modi dicta earum voluptatum ea ad laboriosam quia nesciunt libero a perspiciatis placeat laborum officiis iste adipisci itaque nihil tempora distinctio eveniet, corporis alias. Velit praesentium laudantium sunt?
                Tempora nemo doloribus culpa itaque facilis magni minima provident sit aut, possimus veritatis incidunt quod aperiam optio saepe explicabo quaerat, maiores deleniti enim cum at sapiente. Quibusdam animi quaerat maiores!
                Excepturi perferendis fugit debitis omnis aliquid expedita ipsum, est dolores illo, officiis, tenetur veniam quia ducimus aperiam. Quas illo doloremque vero optio quam? Autem, temporibus hic voluptates nisi laudantium porro!
                Sint ea quibusdam a distinctio possimus earum explicabo assumenda, enim, consectetur cum aut itaque perferendis laboriosam atque sapiente deleniti quae nesciunt, accusamus ad iste delectus omnis! Id vel sunt non.
                Vel necessitatibus earum itaque nulla doloremque, sed consequatur quod deserunt, laboriosam tempore culpa autem consequuntur aliquid, laudantium minima unde aliquam repellendus. Perferendis itaque deserunt dolor natus corporis ipsum, aliquid sapiente.
                Fugit tempora inventore animi aliquid est rem saepe illum, ipsa quae. Pariatur, totam? Quia non, nostrum voluptatum eaque expedita, placeat illo commodi voluptate veritatis vel, sequi quidem asperiores quo aperiam.
                Et ratione, iusto laborum iure, quia eius distinctio, autem fuga corporis architecto quod maiores cumque facere dignissimos minima. Ad a aliquid distinctio ipsa iusto impedit laboriosam ipsam? Nisi, impedit est.
            </Typography>              */}
            <Box sx={{backgroundImage:`url(${banner})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed', height:'100%'}}>
                {/* <CategoryCard /> */}
                {/* <Grid container spacing={4}> */}
                    <CategoryCard />
                {/* </Grid> */}
            </Box>
        </Container>
        </>
    )
}

export default Home