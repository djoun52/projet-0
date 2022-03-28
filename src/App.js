import './App.css';
import {useEffect } from 'react';
import Navbar from './Components/Navbar/SideNavbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ThemeContextProvider from './Context/ThemeContext'
import Error404 from "./Components/Error404/Error404"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import BtnToggle from './Components/BtnToggle/BtnToggle'
function App() {


  const { email } = useSelector(state => ({
    ...state.userReducer,
  }))
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        dispatch({
          type: "ADDUSER",
          payload: response.data.email,
        })
      });


  }, [])

  console.log(email)
  return (

    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BtnToggle />
        <div className="subnav">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <div>
            {email && (<div> Logged in as {email}</div>)}
            {!email && (<div> Not logged in </div>)}
          </div>
        </div>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
