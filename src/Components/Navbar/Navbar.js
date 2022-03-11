import React, { useState, useEffect, useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [largeur, setLargeur] = useState(window.innerWidth)

    const navigate = useNavigate()

    
    const dispatch = useDispatch();

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
                            <button onClick={logOut} className='btn-logout' onclick={logOut}>Log out</button>
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
