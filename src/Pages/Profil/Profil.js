import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Form from '../../Components/Form/FormChangePassword/FormChangePassword'





export default function Profil() {

    const {pseudo, email} = useSelector(state => ({
        ...state.userReducer,
    }))
    
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:4000/user', { withCredentials: true })
            .then(response => {
                if (response.data.statue !== 'user') {
                navigate("/*")
            }})

    } , [])




    return (
        <>
            <h1>Profil</h1>
            <p>Votre Pseudo : {pseudo}</p>
            <p>Votre mail : {email}</p>

            <h2 className="mt-2">Changer votre mots de passe</h2>
            <Form />
        </>
    )
}
