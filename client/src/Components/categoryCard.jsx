import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import img from '../assets/luxe/JaguarF_Type.png'

const CategoryCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image={img}
            alt="Voitures de luxe"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
            Voitures de luxe
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Louer
            </Button>
        </CardActions>
        </Card>
    );
}
    


export default CategoryCard