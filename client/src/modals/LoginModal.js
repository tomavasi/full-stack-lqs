import React, { useState } from 'react'
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./login.css"
import { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { baseUrl } from '../baseUrl';
import { useLogin } from '../api/useBackEnd';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ loginModal, setLoginModal, setSignUpModal }) => {

  if (!loginModal) return null

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("")
  const { setLogin } = useContext(ShopContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await useLogin(`${baseUrl}/api/auth/login`, user, pwd)
    if (status === 200) {
      window.localStorage.setItem("access_token", data.accessToken)
      setLoginModal(false)
      setLogin(true)
      navigate("/")
    }
  }

  return (
    <div onClick={() => setLoginModal(false)} className='loginmodal'>
      <section onClick={e => e.stopPropagation()} className='login-form'>
        <button onClick={() => setLoginModal(false)} className='cancelbtn'><FontAwesomeIcon icon={faXmark} /></button>
        <h1 className='title'>Log in</h1>
        <div className='formcontainer'>
          <form className='inputcontainer' onSubmit={handleSubmit}>
            <label htmlFor="username" />
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={e => setUser(e.target.value)}
              autoComplete='off'
              required />
            <label htmlFor='password' />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={e => setPwd(e.target.value)}
              required />
            <button className='loginbtnmain'>Log in</button>
            <div className='redirect'>
              <p>Not registered yet? </p>
              <button className='signupbtn' onClick={() => { setSignUpModal(true); setLoginModal(false) }}>Register here</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LoginModal