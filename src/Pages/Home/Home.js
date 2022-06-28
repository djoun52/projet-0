import React from 'react'
import { useEffect } from 'react';
import './Home.css'
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {

    const { message, statue } = useSelector(state => ({
        ...state.messageReducer,
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: "REMOVEMESSAGE",
            })
        }, 8000);
    }, [])

    return (
        <>
            <h1 className="home-title">Home</h1>
            {statue && (
                <h2>{message}</h2>
            )}

        </>
    )
}
