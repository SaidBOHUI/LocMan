import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Box  } from '@mui/material';
import vDeLuxe from '../assets/luxe/JaguarF_Type.png';
import utilitaires from '../assets/utilitaires/VW_Kombi_T6.png';
import suv from '../assets/SUV/Skoda_Enyaq_Electrique.png';
import berlines from '../assets/berline/Bmw_serie_7.png';


const cardSX = {
    maxWidth: 345,
    "&:hover":{
        color:"#CB42C2",
        filter: "drop-shadow(10px 10px 20px white)",
        WebkitFilter: "drop-shadow(10px 10px 20px 20px #FFFFFF)",
        /* -webkit-filter: drop-shadow(10px 10px 20px 20px #F5F5DC); */
        transition: "all .5s ease-in-out 0s" 
    }
}
const CategoryCard = () => {
    return (      
        <>        
            {/* <Grid item xs={3}> */}
            <Box sx={{display : 'flex', justifyContent:'space-between', m:1, p:2, background: 'transparent'}}>
                <Card sx={{ cardSX }}>
                {/* <Card sx={{ maxWidth: 345 }}> */}
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={utilitaires}
                        alt="Voitures de luxe"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                            Utilitaires
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            {/* </Box> */}
            {/* </Grid> */}
            {/* <Grid item xs={3}> */}
            {/* <Box sx={{mb :1, border:'black solid 1px'}}> */}
                <Card sx={{ cardSX }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={suv}
                        alt="Voitures de luxe"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                        SUV
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            {/* </Box> */}
            {/* </Grid> */}
            {/* <Grid item xs={3}> */}
            {/* <Box sx={{mb :1, border:'black solid 1px'}}> */}
                <Card sx={{ cardSX }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={berlines}
                        alt="Voitures de luxe"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                        Berlines
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            {/* </Box> */}
            {/* </Grid> */}
            {/* <Grid item xs={3}> */}
            {/* <Box sx={{mb :1, border:'black solid 1px'}}> */}
                <Card sx={{ cardSX }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={vDeLuxe}
                        alt="Voitures de luxe"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                        Voitures de luxe
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            {/* </Grid> */}
        </>  
    );
}
    


export default CategoryCard