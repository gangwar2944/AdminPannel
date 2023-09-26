import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import {handleLogout} from '../Auth/handleLogout'; 
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarContainer = styled.div`
    width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(47, 24, 131);
  color: #fff;
  position: fixed; /* Fixed position */
  top: 0; /* Position it at the top */
  z-index: 1000; /* Ensures it's on top of other content */
  /* You can add other styles like box-shadow, etc. */
`
const Logo = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px 10px;
`
const Signoutbtn= styled.div`
    margin:5px 10px;
    background-color: #fff;
    width:100px;
    border-radius:5px;
    padding:5px;
    color:#000;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
`

const Navbar = (props) => {
    const navigate = useNavigate();
    const toggleBtn=()=>{
       props.toggle();
    }
    function logout(){
        handleLogout();
        navigate("/");
        window.location.reload();
    }
  return (
    <NavbarContainer>
        <Logo >  <MenuIcon onClick={toggleBtn} style={{margin:"5px"}}/> <p>VShop</p> </Logo>
        <Signoutbtn onClickCapture={logout}>Sign out <LogoutIcon style={{marginLeft:"5px"}}/> </Signoutbtn>
    </NavbarContainer>
  )
}

export default Navbar