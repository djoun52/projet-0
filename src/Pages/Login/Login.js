import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Form from '../../Components/Form/FormLogin/FormLogin'
import BtnForgetPassword from '../../Components/Btn/BtnForgetPassword/BtnForgetPassword';



export default function Login() {

    const {statue} = useSelector(state => ({
        ...state.userReducer,
    }))

    const navigate = useNavigate()
    useEffect(() => {
        if (statue) {
            navigate("/*")
        }
    }, [statue])

    
    return (
        <>
            <h1 className="home-title">Connection</h1>
            <Form/>
            <BtnForgetPassword/>
        </>
    )
}
