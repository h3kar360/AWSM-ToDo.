import React from 'react';
import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activateButton = ({ isActive }) => 
    isActive ? 'nav-button-active' : 'nav-button';
  

  return (
    <>
        <nav>
            <div className='logo'>AWSM ToDo.</div>
            <div>
                <NavLink to='/' className={activateButton}>
                  Home
                </NavLink>
                <NavLink to='/add-todo' className={activateButton}>
                  Add ToDo
                </NavLink>
            </div>
        </nav>
    </>
  )
}

export default Navbar;