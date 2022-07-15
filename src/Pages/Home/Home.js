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
            {statue && (
                <div className = 'box center'>
                    <p className='textMes'>{message}</p>
                </div>
            )}
            <h1 className="home-title">Home</h1>
            
            
        </>
    )
}
