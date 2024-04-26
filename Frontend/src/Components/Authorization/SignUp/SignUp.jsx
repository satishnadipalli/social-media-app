import React, { useState } from 'react'
import "./SignUp.css"
import { Input,Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addLoginDetails } from '../../../SliceFolder/MessageSlice'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDetails,setSignInDetails] = useState({
    username:"",
    email:"",
    password:"",
    pic:""
  });


  const handleSubmit = async(event) =>{
    event.preventDefault();
    // console.log(signInDetails);
    try {
      const response = await fetch("http://localhost:9000/user/signup",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(signInDetails)
      });

      const data = await response.json();
      console.log("here is your data",data);
      dispatch(addLoginDetails(data));
      navigate("/");
    } catch (error) {
      
    }
  }

  const handleInputs = (event) =>{
    const {type,value,name} = event.target;

    setSignInDetails((previousValue)=>{
      return{
        ...previousValue,
        [name] : value
      }
    })
  }

  
  return (
    <div className='login-main-div'>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <h1>SignUp</h1>
        <div>
          <label className='signin-labels'>UserName</label>
          <Input
            type='text'
            placeholder='Enter your username' 
            height={9} 
            name='username'
            value={signInDetails.username}
            onChange={handleInputs}
          />
        </div>
        <div>
          <label className='signin-labels'>Email</label>
          <Input 
            placeholder='enter email' 
            type='email' 
            height={9} 
            name='email'
            value={signInDetails.email}
            onChange={handleInputs}
          />
        </div>
        <div> 
          <label className='signin-labels'>Password</label>
          <Input 
            className='signin-inputs' 
            type='password' 
            placeholder='Password' 
            height={9} 
            name='password'
            value={signInDetails.password}
            onChange={handleInputs}
          />
        </div>
        <div>
          <label className='signin-labels'>Re-enter Password</label>
          <Input 
            className='signin-inputs' 
            placeholder='Reenter the password' 
            height={9}
            name='pic'
            value={signInDetails.pic}
            onChange={handleInputs}
          />
        </div>
        
        <Button
          size='md'
          height='35px'
          width='100%'
          border='2px'
          borderColor='green.500'
          className='signup-button'
          type='submit'
        >
          SignUp
        </Button>
      </form>
    </div>
  )
}

export default SignUp
