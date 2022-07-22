import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function checkUserVerify() {

    useEffect(() => {
        isUserVerif();
    }, []);

    const isUserVerif = () => {
        axios.post('http://localhost:4000/user', { withCredentials: true })
    }
    return (
        <>
        </>
    )
}
