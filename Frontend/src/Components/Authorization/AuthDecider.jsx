import React, { useState } from 'react'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const AuthDecider = () => {
    const [login, setlogin] = useState(true);
    return (
        <div
            style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
            className='main-auth-div'
        >
            {login ? <Login setlogin={setlogin} /> : <SignUp setlogin={setlogin} />}
        </div>
    )
}

export default AuthDecider
