import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import UserContext from './UserContext';
import Error404 from "./Components/Error404/Error404"
import axios from 'axios';

function App() {

  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        setEmail(response.data.email);
      });
  }, [])


  return (

    <div className="App">
      <UserContext.Provider value={{ email, setEmail }}>

        <Navbar />
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


      </UserContext.Provider>

    </div>
  );
}

export default App;
