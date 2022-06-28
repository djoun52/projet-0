import React, { useState, useContext } from 'react';
import "../Form.css"
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function FormForgetPassword() {
    const [email, setEmail] = useState("")
    const [errorForm, setErrorForm] = useState({
        state: false,
        message: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)


    const handleForm = (e) => {
        e.preventDefault();
        if (email === ""){
            setErrorForm({
                state: true,
                message: 'EMAIL MANQUANT'
            })
            return false;
        }
        axios.post('http://localhost:4000/forget-password', { email: email }, { withCredentials: true })
        .then(response => {
            console.log(response)
            dispatch({
                type: "ADDMESSAGE",
                payload: "Un code vous a été envoyé par mail pour changé votre mots de passe ",
            })
            navigate("/")
        })
        .catch(err => {
            console.log(err.data)
            setErrorForm({
                state: true,
                message: 'VOTRE EMAIL N\'A PAS ETE TROUVE'
            })
        });

    }


    const changeInput = (e) => {

        if (e.target.classList.contains('inp-email')) {
            setEmail(e.target.value);
        }

    }

    return (
        <>
            <form className="container-form" onSubmit={handleForm}>
                <label htmlFor="email">votre email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='inp-email'
                    value={email}
                    onInput={changeInput}
                    placeholder="Entrez votre email" />
                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit"
                >confirmer</button>
            </form>

            {errorForm.state && (
                <>
                    <h2>Error formulaire</h2>
                    <p>{errorForm.message}</p>
                </>
            )}
        </>
    )
}
