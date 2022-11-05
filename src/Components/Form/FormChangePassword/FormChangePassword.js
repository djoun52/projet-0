import React, { useState, useContext } from 'react';
import "../Form.css"
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function FormChangePassword() {

    const [input, setInput] = useState({
        oldpass: '',
        newpass: '',
        checkPass: ''
    })
    const [formDone, setFormDone] = useState(false)
    const [errorForm, setErrorForm] = useState({
        stat: false,
        mess: ""
    })
    const { id } = useSelector(state => ({
        ...state.userReducer,
    }))

    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const handleForm = (e) => {
        e.preventDefault();
        let info = {
            oldPassword: input.oldpass,
            newPassword: input.newpass,
            userId: id
        }
    
        if (input.oldpass.length < 8 || input.oldpass.length > 20) {
            setErrorForm({
                stat: true,
                mess: "le mots de passe doit contenire entre 8 et 20 caractere "
            })
            return false
        }

        if (input.newpass === input.checkPass) {
            axios.post('http://localhost:4000/changepass', info, { withCredentials: true })
                .then(response => {
                    console.log(response)
                    setInput({
                        oldpass: '',
                        newpass: '',
                        checkPass: ''
                    })
                    setFormDone(true)
                    setErrorForm({
                        stat: false,
                        mess: ""
                    })
                })
                .catch(() => {
                    setErrorForm({
                        stat: true,
                        mess: "error formulaire "
                    })
                });
        } else {
            setErrorForm({
                stat: true,
                mess: "les mots de passe ne coresponde pas"
            })
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
            {!formDone && (

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
            )}
            {formDone && (
                <h2>Votre mot de passe a bien été modifier</h2>
            )}
            {errorForm.stat && (
                <h2>{errorForm.mess}</h2>
            )}
        </>
    )
}
