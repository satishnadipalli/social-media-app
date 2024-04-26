import React, { useState } from 'react'
import "./Login.css";
import { Input,Button } from '@chakra-ui/react'
import { addLoginDetails } from '../../../SliceFolder/MessageSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = ({setlogin}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails,setloginDetails] = useState({
    email:"",
    password:"",
  });

  const handleInputs = (event) =>{
    const {type,value,name} = event.target;

    setloginDetails((previousValue)=>{
      return{
        ...previousValue,
        [name] : value
      }
    })
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/user/login",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(loginDetails)
      });

      if(response.ok){
        const data = await response.json();
        dispatch(addLoginDetails(data));
        navigate("/");
      }else{
        console.log("some thng went wrong");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login-main-div'>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <h1>Login</h1>
        <div>
          <label className='signin-labels'>Email</label>
          <Input  
            className='signin-inputs' 
            placeholder='enter email' 
            height={9} 
            name='email'
            value={loginDetails.email}
            onChange={handleInputs}
          />
        </div>
        <div> 
          <label className='signin-labels'>Password</label>
          <Input 
            className='signin-inputs' 
            placeholder='Password' 
            size='sm' 
            height={9} 
            name='password'
            value={loginDetails.password}
            onChange={handleInputs}
          />
        </div>
        <Button
          size='md'
          height='35px'
          width='100%'
          border='2px'
          borderColor='green.500'
          type='submit'
          className='login-button'
        >
          Login
        </Button>
        <div className='line'>
          <p style={{textAlign:"center",fontSize:"12px"}}>Dont have account ?</p>
        </div>
        <Button
          size='md'
          height='35px'
          width='100%'
          border='2px'
          borderColor='red.500'
          className='signup-button'
          onClick={()=>setlogin(pre=>!pre)}
        >
          SignUp
        </Button>
      </form>
    </div>
  )
}

export default Login
