import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import BtnLogout from '../../BtnLogout/BtnLogout';

export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [largeur, setLargeur] = useState(window.innerWidth)


    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    const { email } = useSelector(state => ({
        ...state.userReducer,
    }))
    useEffect(() => {
        const changeWidth = () => {
            setLargeur(window.innerWidth)
        }
        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])


    return (
        <nav>
            {(toggleMenu || largeur > 500) && (
                <ul className="liste">

                    <li className="items">
                        <Link to='/'>Home</Link>
                    </li>

                    {!email && (
                        <>
                            <li className="items">
                                <Link to='/login'>Login</Link>
                            </li>
                            <li className="items">
                                <Link to='/register'>Register</Link>
                            </li>
                        </>
                    )}
                    {email.length !== 0 && (
                        <li className="items">
                            <BtnLogout />
                        </li>
                    )}
                </ul>
            )}

            <button
                onClick={toggleNav}
                className="btn">BTN</button>

        </nav>
    )
}
