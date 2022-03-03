import './App.css';
import {useState} from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import UserContext from './userContext';

function App() {

  const [email, setEmail] = useState('');

  return (

    <div className="App">
      <UserContext.Provider value={{email, setEmail}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>

      </UserContext.Provider>

    </div>
  );
}

export default App;
