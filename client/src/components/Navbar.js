import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { faCartShopping, faCircleUser,faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../components/Navbar.css'
import { useContext } from 'react'
import { ShopContext } from '../context/shop-context'
import Searchbar from './Searchbar'

export default function Navbar({setLoginModal,setSignUpModal}) {

const {cartItems, getTotalAmount} = useContext(ShopContext);
const [sidebarOpen, setSidebarOpen] = useState(false)

const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
    <div  className='navbar navbar1'>
        <div className="navbar-logo">
        LQS
        </div>
        <div className='searchbar'>
        <Searchbar/>
        </div>
        <div className='btns'>
        <div className='modalbtns'>
        <button className='modalsignupbtn' onClick={()=>setSignUpModal(true)}>Sign up</button>
        <button className='modalloginbtn' onClick={()=>setLoginModal(true)}><FontAwesomeIcon icon={faCircleUser}/></button>
        </div>
        <div className="navbar-cart">
            <Link to="/cart"> <FontAwesomeIcon icon={faCartShopping} /></Link>
            {cartItems.length !== 0 && <div className='badgecontainer'> <span className='badge'>{getTotalAmount()}</span></div>}
        </div>
        </div>
    </div>
    <div className='navbar navbar2'>
    <div className='navbar-links' >
    <Link to="/" > Shop </Link>
    <Link to= "/about-us">About Us</Link>
    </div>
    </div>
    <div  className='sidebar sidebar1'>
        <div className='row1'>
        <div className='burgermenu' onClick={toggleSidebar}><FontAwesomeIcon icon={faBars}/></div>
        <div className="sidebar-logo">
        LQS
        </div>
        <div className="sidebar-cart">
            <Link to="/cart"> <FontAwesomeIcon icon={faCartShopping} /></Link> {cartItems.length !== 0 && <div className='badgecontainer'><span className='badge'>{getTotalAmount()}</span></div>}
        </div>
        </div>
        <div className='row2'>
        <div className='searchbar'>
        <Searchbar/>
        </div>
        </div>
    </div>
    <div className={sidebarOpen ? "sidebar2container active" : 'sidebar2container'} onClick={toggleSidebar}>
    <div className={sidebarOpen ? "sidebar sidebar2 active" : 'sidebar sidebar2'} onClick={e=>e.stopPropagation()}>
    <div className='sidebar-links' onClick={toggleSidebar}>
    <FontAwesomeIcon className= "Xicon" icon={faXmark}/>
    <button className='modalloginbtn' onClick={()=>{setLoginModal(true)}}><FontAwesomeIcon icon={faCircleUser}/></button>
    <Link  to="/"> Shop </Link>
    <Link to= "/about-us">About Us</Link>
        <div className='modalbtns'>
        <button className='modalsignupbtn' onClick={()=>setSignUpModal(true)}>Sign up</button>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}
