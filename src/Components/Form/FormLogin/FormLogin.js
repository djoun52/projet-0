import React from 'react'
import "./FormLogin.css"
export default function FormLogin() {
    return (
        <>
            <form className="container-form" action="">
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" className='inp-email' placeholder="Entrez votre identifiant"/>
                <label htmlFor="password">mot de passe</label>
                <input type="password" name="password" id="password" className='inp-pass' placeholder="Entrez votre mot de passe"/>
                <button type="submit">connexion</button>
            </form>
        </>
    )
}
