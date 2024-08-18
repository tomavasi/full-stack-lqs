import React from 'react'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./login.css"

const LoginModal = ({loginModal,setLoginModal, setSignUpModal}) => {
    if (!loginModal) return null

    const handleSubmit = async (e) =>{
      e.preventDefault();
    }
  return (
    <div onClick={()=>setLoginModal(false)} className='loginmodal'>
    <section onClick={e=>e.stopPropagation()}className='login-form'>
    <button onClick={()=>setLoginModal(false)} className='cancelbtn'><FontAwesomeIcon icon={faXmark}/></button>
    <h1 className='title'>Log in</h1>
    <div className='formcontainer'>
    <form className='inputcontainer' onSubmit={handleSubmit}>
      <label htmlFor="username"/>
      <input
      type="text"
      placeholder="Username"
      id="username"
      name="username"
      autoComplete='off'
      required/>
       <label htmlFor='password'/>
      <input
      type="password"
      placeholder="Password"
      id="password"
      name="password"
      required/>
      <button className='loginbtnmain'>Log in</button>
      <div className='redirect'>
       <p>Not registered yet? </p>
      <button className='signupbtn'onClick={()=>{setSignUpModal(true); setLoginModal(false)}}>Register here</button>
      </div>
      </form>
      </div>
      </section>
      </div>
  )
}

export default LoginModal