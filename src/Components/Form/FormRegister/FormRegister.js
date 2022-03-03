import React, { useState, useContext } from 'react';
import "./FormRegister.css";
import axios from 'axios';
import UserContext from '../../../UserContext';

export default function FormRegister() {

    const [log, setLog] = useState({
        email: '',
        password: ''
    })

    const user = useContext(UserContext)


    const handleForm = (e) => {
        e.preventDefault();
        // console.log(log);
        axios.post('http://localhost:4000/register', log, {withCredentials: true})
        .then(response => {
            user.setEmail(response.data.email)
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

            <button type="submit">connexion</button>
        </form>
    )
}
