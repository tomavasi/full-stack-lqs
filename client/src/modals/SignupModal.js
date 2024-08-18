import React from 'react';
import {useRef, useState, useEffect} from 'react';
import { faInfoCircle, faXmark} from "@fortawesome/free-solid-svg-icons"
import "./signup.css" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignupModal = ({signUpModal,setSignUpModal,setLoginModal}) => {
    const userRef = useRef();

    const [user,setUser] = useState("");
    const [validName, setValidName] = useState (false) ;
    const [userFocus, setUserFocus] = useState(false);

    const [pwd,setPwd] = useState("");
    const [validPwd, setValidPwd] = useState (false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false) ;
    const [matchFocus, setMatchFocus] = useState(false);

    const [email,setEmail] = useState("");
    const [validEmail, setValidEmail] = useState (false);
    const [emailFocus, setEmailFocus] = useState(false);

    useEffect (()=>{
      const result = USER_REGEX.test(user);
      console.log(result);
      console.log(user);
      setValidName(result);
        },[user])

    useEffect (()=>{
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match= pwd === matchPwd;
      setValidMatch (match);
    }, [pwd, matchPwd])

    useEffect (()=>{
      const result = EMAIL_REGEX.test(email);
      console.log(result);
      console.log(email);
      setValidEmail(result);
    },[email])

    if (!signUpModal) return null
  return (
    <div onClick={()=>setSignUpModal(false)} className='signupmodal'>
    <section onClick={e=>e.stopPropagation()} className='signup-form'>
    <button onClick={()=>setSignUpModal(false)} className='cancelbtn'><FontAwesomeIcon icon={faXmark}/></button>
    <h1 className='title'>Register</h1>
    <form className='inputcontainer'>
      <label htmlFor="username"/>
      <input
      type="text"
      placeholder="Username"
      ref={userRef}
      id="username"
      name="username"
      autoComplete='off'
      onChange={e=> setUser(e.target.value)}
      required
      onFocus={() => setUserFocus(true)}
      onBlur={()=>setUserFocus(false)}/>
      <p className={userFocus && user && !validName? "instructions" : "hide"}>
        <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. Must begin with a letter. <br/> Letters, number, underscores, hyphens allowed.
      </p>
      <label htmlFor='email'/>
      <input
      type="email"
      placeholder="Email"
      id="email"
      name="email"
      autoComplete='off'
      onChange={e=> setEmail(e.target.value)}
      required
      onFocus={() => setEmailFocus(true)}
      onBlur={()=>setEmailFocus(false)}
      />
      <p className={emailFocus && email && !validEmail? "instructions" : "hide"}>
        <FontAwesomeIcon icon={faInfoCircle} /> Please enter a valid email address.
      </p>
      <label htmlFor='password'/>
      <input
      type="password"
      placeholder="Password"
      id="password"
      name="password"
      onChange={e=> setPwd(e.target.value)}
      required
      onFocus={() => setPwdFocus(true)}
      onBlur={()=>setPwdFocus(false)}/>
      <label htmlFor='conf_password'/>
      <p className={pwdFocus && !validPwd? "instructions" : "hide"}>
        <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. <br /> Must include upper and lowercase letters, a number and a special charachter.
        <br /> Allowed special characters: !@#$%
      </p>
      <input
      type="password"
      placeholder="Confirm Password"
      id="conf_password"
      name="conf_password"
      onChange={e=> setMatchPwd(e.target.value)}
      required
      onFocus={() => setMatchFocus(true)}
      onBlur={()=>setMatchFocus(false)}/>
      <p className={matchFocus && !validMatch? "instructions" : "hide"}>
        <FontAwesomeIcon icon={faInfoCircle} /> The passwords must match.
      </p>
      <button className='signupbtnmain' disabled={!validEmail || !validMatch || !validName || !validPwd ? true : false}>Sign Up</button>
      <div className='redirect'>
      <p>Are u already registered?</p>
      <button className='loginbtn'onClick={()=>{setSignUpModal(false); setLoginModal(true)}}>Log in</button>
      </div>
    </form>
    </section>
    </div>
  )
}

export default SignupModal