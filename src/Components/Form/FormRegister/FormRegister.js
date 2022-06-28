import React, { useState, useContext } from 'react';
import "../Form.css";
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


export default function FormRegister() {

    const [log, setLog] = useState({
        pseudo: '',
        email: '',
        password: '',
        checkPass: ''
    })
    const [errorRegister, setErrorRegister] = useState({
        error: false,
        message: ''
    })
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const handleForm = (e) => {
        e.preventDefault();
        if (log.password !== log.checkPass) {
            setErrorRegister({ error: true, message: 'password non corespondant' })
        } else if (log.pseudo.length === 0) {
            setErrorRegister({ error: true, message: 'pseudo vide' })
        } else if (log.password.length < 8 || log.password.length > 20) {
            setErrorRegister({ error: true, message: 'le mots de passe doit contenire entre 8 et 20 caractere ' })
        } else {
            axios.post('http://localhost:4000/register', log, { withCredentials: true })
                .then(response => {
                    dispatch({
                        type: "ADDUSER",
                        payload: response.data,
                    })
                    setLog({
                        email: '',
                        password: ''
                    })
                    dispatch({
                        type: "ADDMESSAGE",
                        payload: "inscription réussie un mail vous a été envoyé pour vérifié votre compts ",
                    })

                    setErrorRegister({ error: false, message: '' })

                    navigate("/")
                })
                .catch(() => {
                    setErrorRegister({ error: true, message: 'Email déjà utilisé' })
                });
        }
    }



    const changeInput = (e) => {

        if (e.target.classList.contains('inp-email')) {
            const newObjState = { ...log, email: e.target.value };
            setLog(newObjState);
        } else if (e.target.classList.contains('inp-pseudo')) {
            const newObjState = { ...log, pseudo: e.target.value };
            setLog(newObjState);
        } else if (e.target.classList.contains('inp-pass')) {
            const newObjState = { ...log, password: e.target.value };
            setLog(newObjState);
        } else if (e.target.classList.contains('inp-checkPass')) {
            const newObjState = { ...log, checkPass: e.target.value };
            setLog(newObjState);
        }
    }

    return (
        <>
            <form className="container-form" onSubmit={handleForm}>
                <label htmlFor="email">votre pseudo</label>
                <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    className='inp-pseudo'
                    value={log.pseudo}
                    onInput={changeInput}
                    placeholder="Entrer votre pseudo" />

                <label htmlFor="email"> votre email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='inp-email'
                    value={log.email}
                    onInput={changeInput}
                    placeholder="Entrer votre mail" />

                <label htmlFor="password">mot de passe</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    className='inp-pass'
                    value={log.password}
                    onInput={changeInput}
                    placeholder="Entrer votre mot de passe" />
                <input
                    type="text"
                    name="password"
                    id="password"
                    className='inp-checkPass'
                    value={log.checkPass}
                    onInput={changeInput}
                    placeholder="vérifier mot de passe" />

                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit">connexion</button>
            </form>
            {errorRegister.error && (
                <h2>{errorRegister.message}</h2>
            )}
        </>
    )
}
