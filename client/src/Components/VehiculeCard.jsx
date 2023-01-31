import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  Link,
} from "@mui/material";

function VehiculeCard(props) {

	const [open, setOpen] = useState(false);
	const handleOpen = () => {setOpen(true);};
	const handleClose = () => {setOpen(false)}
	const navigate = useNavigate();

	let vehicule = props.vehicule

	const goToDetails = (id)=>{
		console.log(id, 'id');
		navigate(`/vehicule/${id}`, {state: {data: vehicule}})
	}
	
  return (
	<Card>
	  <CardMedia
		sx={{ height: 200 }}
		image={vehicule.photo.url}
		title={`photo ${vehicule.marque} ${vehicule.modele}`}
	  />
	  <CardContent sx={{pb:0}}>
		<Typography gutterBottom variant="h5" component="div">
		  {`${vehicule.marque} ${vehicule.modele}`}
		</Typography>
		{/* <Typography variant="body2" color="text.secondary">
		  {vehicule.description}
		</Typography> */}
	  </CardContent>
	  <CardActions>
		<Button size="small" onClick={() => {navigate(`/order/${vehicule._id}`, {state: {data: vehicule}})}}>Louer</Button>

		{/* <Button size="small" component={Link} to={`/vehicule/${vehicule._id}`} data={vehicule} >Détails</Button> */}
		{/* <Button size="small" href={`/vehicule/${vehicule._id}`} >Détails</Button> */}
		<Button size="small" onClick={() => goToDetails(vehicule._id)}>Détails</Button>
		{/* <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      	>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
			{`${vehicule.marque} ${vehicule.modele}`}
			</DialogTitle>
			<DialogContent dividers>
			<Typography gutterBottom>
				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
				dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
				consectetur ac, vestibulum at eros.
			</Typography>
			<Typography gutterBottom>
				Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
				Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
			</Typography>
			<Typography gutterBottom>
				Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
				magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
				ullamcorper nulla non metus auctor fringilla.
			</Typography>
			</DialogContent>
			<DialogActions>
			<Button autoFocus onClick={handleClose}>
				Save changes
			</Button>
			</DialogActions>
      </Dialog> */}
	  </CardActions>
	</Card>
  );
}

export default VehiculeCard;
