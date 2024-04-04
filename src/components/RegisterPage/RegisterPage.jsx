import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import DevsLogo from '../../../public/4devslogo.png';
import './RegisterPage.css';
import axios from 'axios';

function RegisterPage() {
    // let history = useHistory();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailMatch, setEmailMatch] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailMatch(e.target.value === confirmEmail);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
        setEmailMatch(e.target.value === email);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                name: name,
                lastName: lastName,
                email: email,
                password: password
            });
            console.log(response.data);
            
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    // function handleClick() {
    //     history.push("/");
    //   }
    

    return (
        <div className="all-page">
            <div className='container-wrapper'>
                <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>New User Register</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='LastName' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='e-mail' value={email} onChange={handleEmailChange} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='Confirm e-mail' value={confirmEmail} onChange={handleConfirmEmailChange} required />
                            <FaUser className='icon' />
                        </div>
                        {!emailMatch && <p style={{ color: 'red' }}>Emails do not match</p>}
                        <div className='input-box'>
                            <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
                            <FaLock className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <FaLock className='icon' />
                        </div>
                        {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
                        <div className='remember-forgot'>
                            <label><input type="checkbox" required />Accepted Conditions</label>
                            <a href="#">Read Conditions</a>
                        </div>
                        <button type="submit" disabled={!emailMatch || !passwordMatch} >Send</button>
                        <div className="register-link">
                            <p>You have an account??<Link to="/HomePage">Login</Link></p>
                        </div>
                    </form>
                </div>
                <h1>Una red social hecha por y para Desarrolladores <span>Juniors</span> </h1>
            </div>
        </div>
    )
}

export default RegisterPage;
