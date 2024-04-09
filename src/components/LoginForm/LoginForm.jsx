import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import DevsLogo from '../../../public/4devslogo.png';
import './LoginForm.css';
import axios from 'axios';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });
      
            if (response.status === 200) {
                navigate('/HomePage');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="all-page">
            <div className='container-wrapper'>
                <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className='icon' />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>Don't have an account?<Link to="/RegisterPage">Register</Link></p>
                        </div>
                    </form>
                </div>
                <h1>Una red social hecha por y para Desarrolladores <span>Juniors</span> </h1>
            </div>
        </div>
    )
}

export default LoginForm;
