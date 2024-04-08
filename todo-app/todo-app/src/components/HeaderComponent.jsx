import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedin, logout } from '../service/AuthService'

function HeaderComponent() {

    const isAuth = isUserLoggedin();
    const navigator = useNavigate();

    function loggedOut() {
        logout();

        navigator('/login');
    }

  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" >Todo Management Application</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            isAuth && 
                            <li className="nav-item">
                            <NavLink className='nav-link' to='/todos'>Todos</NavLink>
                            </li>
                        }
                        
                    </ul>
                </div>
                    <ul className="navbar-nav">
                        {
                            !isAuth && 
                            <li className="nav-item">
                            <NavLink className='nav-link' to='/register'>Register</NavLink>
                            </li>
                        }
                        {
                            !isAuth &&  
                            <li className="nav-item">
                            <NavLink className='nav-link' to='/login'>Login</NavLink>
                            </li>
                        }
                        {
                            isAuth &&  
                            <li className="nav-item">
                            <NavLink className='nav-link' to='/login' onClick={loggedOut}>Logout</NavLink>
                            </li>
                        }
                    </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent