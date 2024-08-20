import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { faCartShopping, faCircleUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../components/Navbar.css'
import { useContext } from 'react'
import { ShopContext } from '../context/shop-context'
import Searchbar from './Searchbar'
import { useMe, useRefresh } from '../api/useBackEnd'
import { baseUrl } from '../baseUrl'
import axios from 'axios'

export default function Navbar({ setLoginModal, setSignUpModal }) {

    const { cartItems, getTotalAmount, login, setLogin } = useContext(ShopContext);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userName, setUserName] = useState('')

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    async function logout() {
        try {
            await axios.delete(`${baseUrl}/logout`)
            localStorage.removeItem("access_token")
            setLogin(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {

        const getMe = async () => {
            const token = localStorage.getItem('access_token')
            const { data, status } = await useMe(`${baseUrl}/api/users/me`, token)
            console.log(status)
            if (status === 200) {
                setUserName(data.user)
                setLogin(true)
            } else if (login && (status === 401 || status === 403)) {
                console.log('inside refresh')
                const { data, status } = await useRefresh(`${baseUrl}/api/auth/refresh`)
                if (status === 401 || status === 403) {
                    logout()
                } else {
                    localStorage.setItem("access_token", data.accessToken)
                }
            } else {
                logout()
            }
        }
        getMe()

        const interval = setInterval(getMe, 10 * 60 * 1000); // Run getMe every 60 seconds (1 minute)
    
        return () => clearInterval(interval);

    }, [login])

    return (
        <>
            <div className='navbar navbar1'>
                <div className="navbar-logo">
                    LQS
                </div>
                <div className='searchbar'>
                    <Searchbar />
                </div>
                <div className='btns'>
                    <div className='modalbtns'>
                        {!login && <button className='modalsignupbtn' onClick={() => setSignUpModal(true)}>Sign up</button>}
                        {!login && <button className='modalloginbtn' onClick={() => setLoginModal(true)}><FontAwesomeIcon icon={faCircleUser} /></button>}
                        {(login && userName) && <p>Welcome {userName}</p>}
                        {login && <button onClick={logout} className='modalsignupbtn'>Sign out</button>}
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
                    <Link to="/about-us">About Us</Link>
                </div>
            </div>
            <div className='sidebar sidebar1'>
                <div className='row1'>
                    <div className='burgermenu' onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></div>
                    <div className="sidebar-logo">
                        LQS
                    </div>
                    <div className="sidebar-cart">
                        <Link to="/cart"> <FontAwesomeIcon icon={faCartShopping} /></Link> {cartItems.length !== 0 && <div className='badgecontainer'><span className='badge'>{getTotalAmount()}</span></div>}
                    </div>
                </div>
                <div className='row2'>
                    <div className='searchbar'>
                        <Searchbar />
                    </div>
                </div>
            </div>
            <div className={sidebarOpen ? "sidebar2container active" : 'sidebar2container'} onClick={toggleSidebar}>
                <div className={sidebarOpen ? "sidebar sidebar2 active" : 'sidebar sidebar2'} onClick={e => e.stopPropagation()}>
                    <div className='sidebar-links' onClick={toggleSidebar}>
                        <FontAwesomeIcon className="Xicon" icon={faXmark} />
                        <button className='modalloginbtn' onClick={() => { setLoginModal(true) }}><FontAwesomeIcon icon={faCircleUser} /></button>
                        <Link to="/"> Shop </Link>
                        <Link to="/about-us">About Us</Link>
                        <div className='modalbtns'>
                            <button className='modalsignupbtn' onClick={() => setSignUpModal(true)}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
