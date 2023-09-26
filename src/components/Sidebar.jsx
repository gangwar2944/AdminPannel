import React, { useState } from 'react'
import './sidebar.css';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { NavLink} from 'react-router-dom';
import Navbar from './Navbar';

const Sidebar = ({children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const toggle =()=>{
        setIsOpen(!isOpen);
    }
  const menuBar=[
     {
        path:"/home",
        name:"Home",
        icon:<HomeOutlinedIcon/>
     },
     {
        path:"/admin",
        name:"Dashboard",
        icon:<DashboardOutlinedIcon/>
     },
     {
        path:"/users",
        name:"Users",
        icon:<PersonOutlineOutlinedIcon/>
     },
     {
        path:"/orders",
        name:"Orders",
        icon:<AddShoppingCartOutlinedIcon/>
     },
     {
        path:"/products",
        name:"Products",
        icon:<ShoppingBagOutlinedIcon/>
     }
  ]
  return (

   <>
   
   <Navbar toggle={toggle}/>
    <div className='container'>
       
        <div style={{width:isOpen?"300px":"50px"}} className='sidebar'>
        {
            menuBar.map((item,index)=>(
             <NavLink to={item.path} key={index} className="navlink" activeclassname="active">
                   <div className='icon'>{item.icon} </div>
                   <div style={{display:isOpen?"block":"none"}} className='iconName'>{item.name} </div>
             </NavLink>
               )
            )
        }
        </div>
      <main className='main' style={{width:isOpen?"76vw":"92vw",marginLeft:isOpen?"300px":"50px"}} >{children}</main>
      {/* <main className='main' style={{marginLeft:isOpen?"300px":"50px"}} >{children}</main> */}
    </div>
    </>
  )
}

export default Sidebar