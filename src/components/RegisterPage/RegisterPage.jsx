import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import DevsLogo from '../../../public/4devslogo.png';
import './RegisterPage.css';
import axios from 'axios';

function RegisterPage() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailMatch, setEmailMatch] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            setSuccessMessage("Usuario registrado, sera redirigido a la pagina de logeo");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setErrorMessage(error.response.data);
        }
    };    

    return (
        <div className="all-page">
            <div className='container-wrapper'>
                <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Nuevo Usuario</h1>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        <div className='input-box'>
                            <input type="text" placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='Apellido' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='e-mail' value={email} onChange={handleEmailChange} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="text" placeholder='Confirmación e-mail' value={confirmEmail} onChange={handleConfirmEmailChange} required />
                            <FaUser className='icon' />
                        </div>
                        {!emailMatch && <p style={{ color: 'red' }}>Los E-mails no coinciden</p>}
                        <div className='input-box'>
                            <input type="password" placeholder='Contraseña' value={password} onChange={handlePasswordChange} required />
                            <FaLock className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Confirmación Contraseña' value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <FaLock className='icon' />
                        </div>
                        {!passwordMatch && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
                        <div className='remember-forgot'>
                            <label><input type="checkbox" required />Aceptar Condiciones</label>
                            <a href="#">Leer Condiciones</a>
                        </div>
                        <button type="submit" disabled={!emailMatch || !passwordMatch} >Enviar</button>
                        <div className="register-link">
                            <p>¿Tiene una cuenta?<Link to="/HomePage">Login</Link></p>
                        </div>
                    </form>
                </div>
                <h1>Una red social hecha por y para Desarrolladores <span>Juniors</span> </h1>
            </div>
        </div>
    )
}

export default RegisterPage;
