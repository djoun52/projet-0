import React, { useState, useContext } from 'react';
import "./FormChangePassword.css"
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


export default function FormChangePassword() {

    const [input, setInput] = useState({
        oldpass: '',
        newpass: '',
        checkPass : ''
    })
    const [errorForm, setErrorForm] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const {theme } = useContext(ThemeContext)

    const handleForm = (e) => {
        e.preventDefault();
        let info = {
            input,
        }

        if (input.newpass === input.checkPass) {
            axios.post('http://localhost:4000/changepass', info, { withCredentials: true })
                .then(response => {


                    setInput({
                        oldpass: '',
                        newpass: '',
                        checkPass: ''
                    })
                    setErrorForm(false)
                    navigate("/")
                })
                .catch(() => {
                    setErrorForm(true)
                });
        } else {
            setErrorForm(true)
        }
    }


    const changeInput = (e) => {

        if (e.target.classList.contains('inp-oldpass')) {
            const newObjState = { ...input, oldpass: e.target.value };
            setInput(newObjState);
        } else if (e.target.classList.contains('inp-newpass')) {
            const newObjState = { ...input, newpass: e.target.value };
            setInput(newObjState);
        } else if (e.target.classList.contains('inp-checkPass')) {
            const newObjState = { ...input, checkPass: e.target.value };
            setInput(newObjState);
        }
    }



    return (
        <>
            <form className="container-form" onSubmit={handleForm}>

                <label htmlFor="password">votre ancien mot de passe</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    className='inp-oldpass'
                    value={input.oldpass}
                    onInput={changeInput}
                    placeholder=" mot de passe" />

                <label htmlFor="password">votre nouveau mot de passe</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    className='inp-newpass'
                    value={input.newpass}
                    onInput={changeInput}
                    placeholder="mot de passe" />

                <input
                    type="text"
                    name="password"
                    id="password"
                    className='inp-checkPass'
                    value={input.checkPass}
                    onInput={changeInput}
                    placeholder="vérifier mot de passe" />

                <button
                    className={theme ? "btn-dark" : "btn-light"}
                    type="submit">changer</button>
            </form>
            {errorForm && (
                <h2>Error formulaire</h2>
            )}
        </>
    )
}
