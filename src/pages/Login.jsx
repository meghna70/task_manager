import React from 'react'
import image from "../girl.gif"
import team from "../team.gif"
import team2 from "../team2.png"
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import{Client,Account} from 'appwrite';

function Login({handleLogin},{handleUser}) {
  const navigate= useNavigate();
  const [errorMessages, setErrorMessages] = useState({})
  let client = new Client();
  let accounts=new Account(client)
  client.setEndpoint('https://cloud.appwrite.io/v1') .setProject('6476c4a36c8cff9ced33');      

  
  const [email,setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [loggedIn, setLoggedIn] = useState(false);

  function handleEmailChange(event){
      setEmail(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
}
  const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log("email:"+email+"  password:"+password)
    try{
     let promise=await accounts.createEmailSession(email,password);
      setLoggedIn(true);
      navigate('/profile');
      console.log("promise:"+JSON.stringify(promise))
      handleLogin(true)
      // handleUser(JSON.stringify(promise))
    }catch(err){
      console.log(err)
      navigate('/profile'); //for testing purposes, remove when appwrite works
      setErrorMessages({ message:"Invalid Credentials" });
      handleLogin(false)//change this to false after testing phase over 
    }
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className='login-container'> 
        {loggedIn && <NavLink to="/profile" />}
        <div className='login-illustration'>
        <div className='login-title'>
        <p><img src={logo} height={40} width={40}/>
                TaskHive </p>
        <div className='login-tagline'>
          <div className='login-tagline-first'>Task management </div> 
          <div className='login-tagline-second'>made <span>easy</span> </div>
          </div>
        </div> 
        <div className="login-illustration-section">
           <img src={team} />
           <p>Not a member? Sign up</p>
        </div>
        </div>
        <div className='login-content'>
           
        <div className="login-part">
        <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <>
            <div className="input-container">
            <label><FontAwesomeIcon icon={faUser}/>
            <input className='input-type1' 
                   type="text" 
                   name="email" 
                   placeholder='email' 
                   onChange={handleEmailChange}
                   value={email}
                   required />
             </label>

            {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
            <label><FontAwesomeIcon icon={faLock}/> 
            <input className='input-type1' 
                  type="password" 
                  name="password" 
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder='password' 
                  required />
            </label>

            {renderErrorMessage("pass")}
            </div>
            <input type="checkbox"/> {" "}
            <label>Remember me</label>
            <div className="button-container">
            <input className='input-type2' type="submit" />
            </div>
            </>
        </form>
    </div>
    </div>
        </div>
        </div>
    </div>
  )
}

export default Login