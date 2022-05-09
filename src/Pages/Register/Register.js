import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Form from '../../Components/Form/FormRegister/FormRegister'

export default function Register() {
    const {statue} = useSelector(state => ({
        ...state.userReducer,
    }))
    console.log(statue)
    const navigate = useNavigate()
    useEffect(() => {
        if (statue) {
            navigate("/*")
        }
    }, [statue])
    
    return (
        <>
            <h1 className="home-title">inscription</h1>
            <Form/>
        </>
    )
}
