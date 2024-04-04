import { useState } from 'react'
import { Link } from 'react-router-dom'
import commercelogo from '../assets/commercelogo.png'
import '../Css/Nav.css'


export const Nav = () => { //navbar with routing links to different pages
  return (
    <nav className='Navbar'>
        <img src={commercelogo} alt='commerce logo' className='commercelogo'/>
            <div className='NavItems'>
                <ul> 
                    <li className='NavList'><Link to="/home">IP Table</Link></li>
                    <li className='NavList'><Link to="/Add">Add IP </Link></li>
                    <li className='NavList'><Link to="/Delete">User Management Table</Link></li>
                    <li className='NavList'>Log Out</li>
                </ul>
            </div>
    </nav>
  )
};