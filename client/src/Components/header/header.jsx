import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from '../../assets/logo.svg'
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
// import { Redirect } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';


function Header() {
	const navigate = useNavigate()
	const state = useContext(GlobalState)
	const [isLogged, setIsLogged] = state.userApi.isLogged;
	const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
	const [dataUser, setDataUser] = state.userApi.dataUser;


	const handleLogout = async() => {
		try {
			await axios.get("/user/logout");         
			setIsLogged(false); 
			setIsAdmin(false);
			localStorage.removeItem("firstLogin");  
			return navigate("/");			
			// return Redirect("/");			
		} catch (error) {
			console.log(error);
			return "impossible de vous déconnecter"
		}
	}

	useEffect(() => {
		console.log(isLogged, isAdmin, 'isAdmin ans isLogged');

	}, [isLogged, isAdmin])
	

	var [visible, setVisible] = useState(false)

	return(
		<NavStyle visible = {visible}> 
			<Logo  href = '/' title="redirection sur la home">
				<img src={logo} alt="logo" />
			</Logo>
			<MenuStyle visible = {visible}>
				{isLogged && isAdmin ? 
					<StyledLink to="/admin/vehicules" title={"redirection vers la page Admin"} onClick={()=> setVisible(!visible)}>
						Admin
					</StyledLink> :
					<StyledLink to="/" title={"redirection vers la page Home"} onClick={()=> setVisible(!visible)}>
						Home
					</StyledLink>}
				<StyledLink to="/" title="Nos véhicules" onClick={()=> setVisible(!visible)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-car-front-fill" viewBox="0 0 16 16">
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                </svg>
				</StyledLink>
					{(isLogged) ?
						<StyledLink to="/" title="Me déconnecter"  onClick={()=> {handleLogout(); setVisible(!visible)}}>
							<LogoutIcon />
						</StyledLink> : 	
						<StyledLink to="/user/login" title="Me connecter"  onClick={()=> setVisible(!visible)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
								<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
							</svg>
						</StyledLink>											
					}
				<ShadowAnime></ShadowAnime>
			</MenuStyle>
			<BurgerStyle onClick={()=> setVisible(!visible)} visible = {visible}>
				<Bar visible = {visible}></Bar>
				<Bar visible = {visible}></Bar>
				<Bar visible = {visible}></Bar>
			</BurgerStyle>
			<House visible = {visible} href="#Accueil" onClick={()=> setVisible(!visible)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#1abc9c" className="bi bi-house-fill" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
					<path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
				</svg>	
			</House>
		</NavStyle>
	)
}


const ShadowAnime = styled.div`
	position: absolute;
	height: 100%;
	/* height: 5px;  */
	top: 0;
	/* bottom: 0; ; */
	/* z-index: 0; */
	background-color: #FFFFFF;
	border-radius: 8px;
	transition: all .5s ease 0s;
	@media(max-width: 660px){
		display: none;
	}
`

const NavStyle = styled.nav`
	z-index: 5;
	position: relative;
	top : 0 ;
	width: 100%;
	height: 70px;
	/* background-color : ${(pathname) => pathname === "/citation/create" ? '#F5F5DC' : "#A52A2A"} ; */
	/* background :${({pathname}) => pathname = "/citation/create"  ? "#A52A2A":"#F5F5DC"}; */
	background :#000000;
	/* background :#285181; */
	font-size: 0;
	box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
	display: flex;	
	justify-content: space-between;
	align-items: center;
	font-family: 'Open Sans', 'sans-serif';
	@media(max-width: 660px){
		/* height: 100vh; */
		height:${({visible}) => visible ? "100vh":'0'} ;
		background:${({visible}) => visible ? "#151F27":'#B8FAF0'} ;
		/* background:${({visible}) => visible ? "#151F27":'#212F3C'} ; */
		z-index: 15;
	}
`

const Logo = styled.a`
	font-size:1.4rem;
	font-weight: 800;
	text-decoration: none;
	text-transform: uppercase;
	margin : 0 2rem;
	align-items: center;
	/* color :${({pathname}) => pathname = "/citation/create"  ? "#A52A2A":"#F5F5DC"}; */
	/* color :${({pathname}) => pathname = "/citation/create"  ? "#F5F5DC":"#A52A2A"}; */
	/* color: #A52A2A; */
	cursor: pointer;
	&:hover{
		filter: drop-shadow(10px 10px 20px white);
		-webkit-filter: drop-shadow(10px 10px 20px 20px #A52A2A);
		/* -webkit-filter: drop-shadow(10px 10px 20px 20px #F5F5DC); */
		transition: all .5s ease-in-out 0s;
	}

	/* color: #FFAA00;  */
	@media(max-width: 660px){
		display: none;
	}

`

const MenuStyle = styled.div`
	display: block;

	@media(max-width: 660px){
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	position:absolute;
	top: 0;
	right: 0;
	/* bottom: 0; */
	height: 100vh;
	width: 100%;
	/* padding: 2rem; */
	background: #151F27;
	transform: ${({visible}) => visible ? "translateX(0)":'translateX(100%)'} ;
	transition: transform 400ms;
	/* background-color: #F5F5DB; */
	}
`


const StyledLink  = styled(Link)`
     //some CSS styles here
	font-size: 1rem;
	text-transform: uppercase;
	color: #FFFFFF;
	/* color :${({pathname}) => pathname = "/citation/create" ? "#A52A2A":"#F5F5DC"}; */
	/* color :${({pathname}) => pathname = "/citation/create"  ? "#F5F5DC":"#A52A2A"}; */
	text-decoration: none;
	line-height: 70px;
	position: relative;
	z-index: 1;
	display: inline-block;
	text-align: center;
	height: 70px;
	padding: 0 2rem;
	/* background-color: #F5F5DB; */
	/* width: auto; */

	&:hover{
		color:#000000 ;
		/* color :${({pathname}) => pathname = "/citation/create" ? "#A52A2A":"#F5F5DC"}; */
		/* color :${({linkOnHoover}) => linkOnHoover}; */
		/* ${({visible}) => visible ? '0':'1'} */
	}
		&:nth-child(1) {
			&:hover~${ShadowAnime}{
				width: 111.11px;
				right: 168px;
			}
		}
		&:nth-child(2) {
			&:hover~${ShadowAnime}{
				width: 84px;
				right: 84px;
			}
		}
		&:nth-child(3) {
			&:hover~${ShadowAnime}{
				width: 84px;
				right:0;
			}
		}  
`;

// const Card = styled.div`

// @property --rotate {
//   syntax: "<angle>";
//   initial-value: 132deg;
//   inherits: false;
// }

// /* :root {
//   --card-height: 65vh;
//   --card-width: calc(var(--card-height) / 1.5);
// } */

//   background: #101a47;
//   text-align: center;
//   /* line-height: 70px; */
//   width: var(--card-width);
//   width: 1rem;
//   height: 2rem;
//   padding: 3px;
//   position: relative;
//   border-radius: 6px;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   display: flex;
//   font-size: 1.5em;
//   color: rgb(88 199 250 / 0%);
//   cursor: pointer;
//   font-family: cursive;

// 	&:hover {
// 	color: rgb(255 201 102 / 100%);
// 	/* color: rgb(88 199 250 / 100%); */
// 	transition: color 1s;
// 	}
// 	&:hover&:before, &:hover:after {
// 	animation: none;
// 	opacity: 0;
// 	}
// 	&:before {
// 	content: "";
// 	width: 104%;
// 	height: 102%;
// 	border-radius: 8px;
// 	background-image: linear-gradient(
// 		var(--rotate)
// 		, #FFFF00, #FFA500 43%, #FF0000);
// 		position: absolute;
// 		z-index: -1;
// 		top: -1%;
// 		left: -2%;
// 		animation: spin 2.5s linear infinite;
// 	}

// 	&:after {
// 	position: absolute;
// 	content: "";
// 	top: calc(var(--card-height) / 6);
// 	left: 0;
// 	right: 0;
// 	z-index: -1;
// 	height: 100%;
// 	width: 100%;
// 	margin: 0 auto;
// 	transform: scale(0.8);
// 	filter: blur(calc(var(--card-height) / 6));
// 	background-image: linear-gradient(
// 		var(--rotate)
// 		, #FFFF00, #FFA500 43%, #FF0000);
// 		opacity: 1;
// 	transition: opacity .5s;
// 	animation: spin 2.5s linear infinite;
// 	}

// 	@keyframes spin {
// 	0% {
// 		--rotate: 0deg;
// 	}
// 	100% {
// 		--rotate: 360deg;
// 	}
// 	}
// `




// const MenuLink = styled.a`
// 	font-size: 1rem;
// 	text-transform: uppercase;
// 	color: white;
// 	/* color: #FFAA00; */
// 	text-decoration: none;
// 	line-height: 70px;
// 	position: relative;
// 	z-index: 1;
// 	display: inline-block;
// 	text-align: center;
// 	height: 70px;
// 	padding: 0 1rem;

// 	&:nth-child(1) {
// 		&:hover~${ShadowAnime}{
// 			width: 144.92px;
// 			right:358.56px
// 		}
// 	}
// 	&:nth-child(2) {
// 		&:hover~${ShadowAnime}{
// 			width: 131.67px;
// 			right: 226.89px;
// 		}
// 	}
// 	&:nth-child(3) {
// 		&:hover~${ShadowAnime}{
// 			width: 118.73px;
// 			right: 108.16px;
// 		}
// 	}
// 	&:nth-child(4) {
// 		&:hover~${ShadowAnime}{
// 			width: 104.39px;
// 			right:0;
// 		}
// 	}
// 	@media(max-width: 660px){
// 		padding: 1.5rem;
// 		font-size: 5vw;
// 		text-decoration: none;
// 		top: 0;
// 		right: 0;
// 			&:hover{
// 				color: #1abc9c;
// 			}

// }
// `
const BurgerStyle = styled.button`
	display: none;
		@media(max-width: 660px){
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			position: fixed;
			height: 2.5rem;
			top: 2rem;
			right: 2rem;
			background: transparent;
			border: none;
			cursor:pointer;
			z-index: 5;
 		}
`

const Bar = styled.div`
/* display: none; */

	@media(max-width:660px){
	width: 2.5rem;
	height: 0.2rem;
	background:${({visible}) => visible ? '#1abc9c':'#151F27'} ;
	z-index: 5;
	position: relative;
	border-radius: 5px;
	transform-origin : 3px ;
		&:nth-child(1){
			transform: ${({visible}) => visible ? 'rotate(45deg)':'rotate(0)'};
		}
		&:nth-child(2) {
			opacity: ${({visible}) => visible ? '0':'1'}
		}
		&:nth-child(3){
			transform: ${({visible}) => visible ? "rotate(-45deg)":"rotate(0)"};
		}
	}			
`
const House = styled.a`
display: none;
@media(max-width:660px){
	display: ${({visible}) => visible ? "block":"none"} ;
	position: fixed;
	top: 2rem;
	left: 2rem;
}
`

export default Header;