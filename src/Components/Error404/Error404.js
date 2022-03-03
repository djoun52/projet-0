import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Error404.css'
export default function Error404() {

    const navigate = useNavigate()
    const goHome = ()=> {
        navigate("/")
    }
    return (
        <>
            <h1>error 404 Page not found</h1>
            <div className="">
                <button className="btn404"  onClick={goHome}> Retourner à l'accueil</button>
            </div>
        </>
    )
}
