import React, { useState, useContext } from 'react';
import "../Form.css"
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function FormForgetPassword() {
    const [email, setEmail] = useState("")
    const [errorForm, setErrorForm] = useState(false)

    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)


    const handleForm = (e) => {
        e.preventDefault();
        console.log(email)
        axios.post('http://localhost:4000/forget-password', {email : email}, { withCredentials: true })
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
                    placeholder="Entrez votre identifiant" />
                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit"
                >confirmer</button>
            </form>

        </>
    )
}
