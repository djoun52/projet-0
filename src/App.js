import './App.css';
import {useEffect } from 'react';
import Navbar from './Components/Navbar/SideNavbar/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profil from './Pages/Profil/Profil';
import Login from './Pages/Login/Login';
import VerifEmail from './Pages/VerifEmail/VerifEmail';
import Register from './Pages/Register/Register';
import FormForgetPass from './Pages/FormForgetPass/FormForgetPass';
import FormForgetPassOtp from './Pages/FormForgetPassOtp/FormForgetPassOtp';
import ThemeContextProvider from './Context/ThemeContext'
import Error404 from "./Components/Error404/Error404"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import BtnToggle from './Components/Btn/BtnToggle/BtnToggle'



function App() {

  const { email,pseudo } = useSelector(state => ({
    ...state.userReducer,
  }))
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        if (response.data.statue === 'user'){
          
          dispatch({
            type: "ADDUSER",
            payload: response.data,
          })
          console.log('verif')
        }
      });
  }, [])

  return (

    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BtnToggle />
        <div className="subnav">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verif-email/*" element={<VerifEmail />} />
            <Route path="/form-forget-password" element={<FormForgetPass />} />
            <Route path="/reset-pasword/*" element={<FormForgetPassOtp />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <div className="mt-2">
            {email && (<div> Log as {pseudo}</div>)}
            {!email && (<div> Not log </div>)}
          </div>
        </div>
        <footer>
          <Link to='/mentionlegal' className='ml-5'>Mention légal</Link>
        </footer>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
