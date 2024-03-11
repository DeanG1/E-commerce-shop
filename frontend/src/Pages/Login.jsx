import React,{useState} from 'react'
import './CSS/LoginSignUp.css'
const Login = () => {

  const [state,setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    // We use this operator '...' for the userfield to update the username, password and email field!
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const login = async () => {
    console.log("Login function executed!",formData)
  }
  const signUp = async () => {
    console.log("SignUp function executed!",formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json', 
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
  } 

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your name"/> : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Your email"/>
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
        </div>
        <button onClick={() => {state === "Login" ? login() : signUp()}}>Continue</button>
        {state==="Sign Up" ?  <p className='loginsignup-login'>Already have an accound! <span onClick={() => {setState("Login")}}>Login here</span></p> : <p className='loginsignup-login'>Create an accound! <span onClick={() => {setState("Sign Up")}} >Click here</span></p>} 
        <div className="loginsingup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use and privacy</p>
        </div> 
      </div>
    </div>
  )
}

export default Login