import React from 'react'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function BtnForgetPassword() {

    const navigate = useNavigate()

    const forgetPassword = () => {
        navigate("/form-forget-password")
    }

    return (
        <>
            <button onClick={forgetPassword}> mots de passe oublié </button>
        </>
    )
}
