import React from 'react'
import './CSS/LoginSignUp.css'
const Login = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Your name"/>
          <input type="email" placeholder="Your email"/>
          <input type="password" placeholder="Password"/>
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an accound! <span>Login here</span></p>
        <div className="loginsingup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use and privacy</p>
        </div> 
      </div>
    </div>
  )
}

export default Login