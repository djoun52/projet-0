import React, { useState, useContext } from 'react';
import "../Form.css"
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function FormLogin() {



    const [log, setLog] = useState({
        email: '',
        password: ''
    })

    const [loginErro, setLoginErro] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const handleForm = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/login', log, { withCredentials: true })
            .then(response => {

                dispatch({
                    type: "ADDUSER",
                    payload: response.data,
                })
                setLog({
                    email: '',
                    password: ''
                })
                setLoginErro(false)
                navigate("/")
            })
            .catch(() => {
                setLoginErro(true)
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
                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit"
                >connexion</button>
            </form>
            {loginErro && (
                <h2>identifiant ou mots de passe incorrect</h2>
            )}
        </>
    )
}
