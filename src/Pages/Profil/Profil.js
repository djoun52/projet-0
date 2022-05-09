import React from 'react'
import { useSelector } from 'react-redux';
import Form from '../../Components/Form/FormChangePassword/FormChangePassword'





export default function Profil() {

    const { id, email, pseudo} = useSelector(state => ({
        ...state.userReducer,
    }))





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
