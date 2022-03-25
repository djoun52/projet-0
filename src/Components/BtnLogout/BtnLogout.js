import React from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function BtnLogout() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logOut = () => {
        axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
            .then(() =>
                // user.setEmail('')
                dispatch({
                    type: "REMOVEUSER",
                    payload: ''
                })
            )
        navigate("/")
    }
    return (
        <>
            <button onClick={logOut} className='btn-logout'>Log out</button>

        </>
    )
}
