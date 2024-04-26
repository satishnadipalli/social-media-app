import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AuthDecider from './Components/Authorization/AuthDecider'
import Home from './Components/Home/Home'
import {useSelector} from "react-redux"
function App() {
  const [count, setCount] = useState(0);
  const {userCredentials} = useSelector(state=>state.messages);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/Authutication' element={<AuthDecider/>}></Route>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
