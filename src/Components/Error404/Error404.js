import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error404() {

    const navigate = useNavigate()
    const goHome = ()=> {
        navigate("/")
    }
    return (
        <>
            <h1>error 404 Page not found</h1>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary text-center" 
                    onClick={goHome}> Retourner à l'accueil</button>
            </div>
        </>
    )
}
