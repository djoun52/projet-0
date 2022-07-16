import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

export default function FormForgetPassOtp() {


    const [input, setInput] = useState({
        newpass: '',
        checkPass : ''
    })

    const [errorForm, setErrorForm] = useState({
        state: false,
        message: ''
    })
    const [activeOtpIndex, setaAtiveOtpIndex] = useState(0)
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
        axios.post('http://localhost:4000/verify-pass-reset-token',{
            token,
            userId} 
            ,{ withCredentials: true })
        .then(response => {
            console.log(response.data.valid)     
            if (!response.data.valid) {
                dispatch({
                    type: "ADDMESSAGE",
                    payload: "la procédure pour changé le mots de passe a éxpiré ",
                })
                navigate("/")
            }
        })
    };


    const handleForm = (e) => {
        e.preventDefault();
        let info = {
            newPassword: input.newpass,
            userId: userId
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
        </>
    )

}
