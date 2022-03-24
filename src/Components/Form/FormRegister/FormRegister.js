import React, { useState, useContext } from 'react';
import "./FormRegister.css";
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function FormRegister() {

    const [log, setLog] = useState({
        email: '',
        password: ''
    })
    const [errorRegister, setErrorRegister] = useState(false)
    const { toggleTheme, theme } = useContext(ThemeContext)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault();
        // console.log(log);
        axios.post('http://localhost:4000/register', log, { withCredentials: true })
            .then(response => {

                dispatch({
                    type: "ADDUSER",
                    payload: response.data.email,
                })
                setLog({
                    email: '',
                    password: ''
                })
                setErrorRegister(false)
                navigate("/")
            })
            .catch(() => {
                setErrorRegister(true)
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
                    type="text"
                    name="password"
                    id="password"
                    className='inp-pass'
                    value={log.password}
                    onInput={changeInput}
                    placeholder="Entrez votre mot de passe" />

                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit">connexion</button>
            </form>
            {errorRegister && (
                <h2>Error inscription</h2>
            )}
        </>
    )
}
