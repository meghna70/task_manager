import React from 'react'
import image from "../girl.gif"
import team from "../team.gif"
import team2 from "../team2.png"
import { useState } from 'react';
import logo from "../logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className='login-container'> 
        <div className='login-content'>
            <p><img src={logo} height={40} width={40}/>
                TaskHive </p>
        <div className="login-part">
        <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input-container">
            <label><FontAwesomeIcon icon={faUser}/>
            <input className='input-type1' type="text" name="uname" placeholder='Username' required />
             </label>
            
            {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
            <label><FontAwesomeIcon icon={faLock}/> 
            <input className='input-type1' type="password" name="pass" placeholder='password' required /></label>
           
            {renderErrorMessage("pass")}
            </div>
            <input type="checkbox"/> {" "}
            <label>Remember me</label>
            <div className="button-container">
            <input className='input-type2' type="submit" />
            </div>
        </form>
    </div>
    </div>
        </div>
        

        </div>
        <div className='login-illustration'>
           <img src={team2} />
           <p>Not a member? Sign up</p>
        </div>
    </div>
  )
}

export default Login

