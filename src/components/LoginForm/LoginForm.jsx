import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import DevsLogo from '../../../public/4devslogo.png';
import './LoginForm.css';


function LoginForm() {

    return (
        <div className="all-page">
            <div className='container-wrapper'>

                <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />

                <div className='wrapper'>
                    <form action="">
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='Password' required />
                            <FaLock className='icon' />
                        </div>

                        <div className='remember-forgot'>
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit" ><Link to="/HomePage">Login</Link></button>

                        <div className="register-link">
                            <p>Don´t have an account? <a href="#">Register</a></p>
                        </div>
                    </form>

                </div>
                <h1>Una red social hecha por y para Desarrolladores <span>Juniors</span> </h1>
            </div>
        </div>
    )
}

export default LoginForm;
