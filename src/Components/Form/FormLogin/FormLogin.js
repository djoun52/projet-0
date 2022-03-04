import React, { useState, useContext } from 'react';
import "./FormLogin.css"
import axios from 'axios';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom'


export default function FormLogin() {



    const [log, setLog] = useState({
        email: '',
        password: ''
    })
    const [longinErro, setLonginErro] = useState(false)

    const user = useContext(UserContext)
    const navigate = useNavigate()



    const handleForm = (e) => {
        e.preventDefault();
        // console.log(log);
        axios.post('http://localhost:4000/login', log, { withCredentials: true })
            .then(response => {
                user.setEmail(response.data.email)
                setLog({
                    email: '',
                    password: ''
                })
                setLonginErro(false)
                navigate("/")
            })
            .catch(()=> {
                setLonginErro(true)
            });

    }

    const changeInput = (e) => {

        if (e.target.classList.contains('inp-email')) {
            const newObjState = { ...log, email: e.target.value };
            setLog(newObjState);

        } else if (e.target.classList.contains('inp-pass')) {
            const newObjState = { ...log, password: e.target.value };
            setLog(newObjState);
        }

    }


    return (
        <>
            <form className="container-form" onSubmit={handleForm}>
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='inp-email'
                    value={log.email}
                    onInput={changeInput}
                    placeholder="Entrez votre identifiant" />

                <label htmlFor="password">mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className='inp-pass'
                    value={log.password}
                    onInput={changeInput}
                    placeholder="Entrez votre mot de passe" />
                <button type="submit">connexion</button>
            </form>
                {longinErro && (
                    <h2>Error connextion</h2>
                )}
        </>
    )
}
