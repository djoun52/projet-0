import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

export default function FormForgetPassOtp() {


    const [input, setInput] = useState({
        newpass: '',
        checkPass: ''
    })

    const [errorForm, setErrorForm] = useState({
        stat: false,
        mess: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("id");


    useEffect(() => {
        isValidToken();
    }, []);

    const isValidToken = async () => {
        console.log(token)
        axios.post('http://localhost:4000/verify-pass-reset-token', {
            token,
            userId
        }
            , { withCredentials: true })
            .then(response => {
                console.log(response.data.valid)
                if (!response.data.valid) {
                    dispatch({
                        type: "ADDMESSAGE",
                        payload: response.data.mess,
                    })
                    navigate("/")
                }
            })
    };


    const handleForm = (e) => {
        e.preventDefault();
        let info = {
            newPassword: input.newpass,
            userId: userId,
            token: token
        }
        
        if (input.newpass.length < 8 || input.newpass.length > 20) {
            setErrorForm({
                stat: true,
                mess: "le mots de passe doit contenire entre 8 et 20 caractere "
            })
            return false
        }

        if (input.newpass === input.checkPass) {
            axios.post('http://localhost:4000/reset-password', info, { withCredentials: true })
                .then(response => {
                    console.log(response)
                    setInput({
                        newpass: '',
                        checkPass: ''
                    })
                    setErrorForm({
                        stat: false,
                        mess: ""
                    })
                    dispatch({
                        type: "ADDMESSAGE",
                        payload: response.data.message,
                    })
                    navigate("/")
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

        if (e.target.classList.contains('inp-newpass')) {
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
            {errorForm.stat && (
                <h2>{errorForm.mess}</h2>
            )}
        </>
    )

}
