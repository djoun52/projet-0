import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import BtnLogout from '../../Btn/BtnLogout/BtnLogout';
import { SidebarData, SidebarDataUSer } from "./SidebarData"
import { IconContext } from 'react-icons';

export default function Navbar() {

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    let result;

    const { email } = useSelector(state => ({
        ...state.userReducer,
    }))


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {!email && (
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        )}
                        {email.length !== 0 && (
                            <>
                                {SidebarDataUSer.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li className="nav-text">
                                    <BtnLogout />
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
